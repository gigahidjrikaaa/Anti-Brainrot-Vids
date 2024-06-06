# recommendations/utils.py
import numpy as np
import pandas as pd
from scipy.sparse.linalg import svds
from .models import Rating, YouTubeVideo

def get_svd_recommendations(user_id, k=50):
    # Get the ratings data
    ratings = Rating.objects.all().values('user_id', 'video_id', 'rating')
    ratings_df = pd.DataFrame(ratings)

    # Ensure the DataFrame contains the correct columns
    if 'user_id' not in ratings_df.columns or 'video_id' not in ratings_df.columns or 'rating' not in ratings_df.columns:
        raise ValueError("The ratings DataFrame must contain 'user_id', 'video_id', and 'rating' columns.")
    
    # Create a user-item matrix
    R_df = ratings_df.pivot(index='user_id', columns='video_id', values='rating').fillna(0)
    R = R_df.values

    # Subtract the mean for each user (normalize by each user's mean rating)
    user_ratings_mean = np.mean(R, axis=1)
    R_demeaned = R - user_ratings_mean.reshape(-1, 1)

    # Perform SVD
    U, sigma, Vt = svds(R_demeaned, k=k)
    sigma = np.diag(sigma)

    # Predict ratings
    all_user_predicted_ratings = np.dot(np.dot(U, sigma), Vt) + user_ratings_mean.reshape(-1, 1)
    preds_df = pd.DataFrame(all_user_predicted_ratings, columns=R_df.columns)
    
    # Get the user's predicted ratings
    user_row_number = user_id - 1  # Assuming user_id starts at 1 and matches row index
    sorted_user_predictions = preds_df.iloc[user_row_number].sort_values(ascending=False)

    # Get the user's data and merge in video information.
    user_data = ratings_df[ratings_df.user_id == user_id]
    user_full = (user_data.merge(pd.DataFrame(sorted_user_predictions).reset_index(), how='left', left_on='video_id', right_on='video_id')
                             .rename(columns={user_row_number: 'predictions'}))

    # Recommend the highest predicted rating videos that the user hasn't already rated.
    recommendations = (YouTubeVideo.objects.filter(video_id__in=sorted_user_predictions.index)
                       .exclude(video_id__in=user_full['video_id'])
                       .order_by('-predictions')[:10])

    return recommendations
