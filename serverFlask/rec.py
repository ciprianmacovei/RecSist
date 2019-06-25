#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Dec 14 13:10:47 2018

@author: cip
"""

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from pandas import DataFrame 
import nltk
import gzip
from sklearn.neighbors import NearestNeighbors
from sklearn.linear_model import LogisticRegression
from sklearn import neighbors
from scipy.spatial.distance import cosine
from sklearn.metrics import classification_report
from sklearn.metrics import accuracy_score
from sklearn.feature_selection import SelectKBest
from sklearn.feature_extraction.text import CountVectorizer, TfidfTransformer

import pymongo
from pymongo import MongoClient
import re
import string
from wordcloud import WordCloud, STOPWORDS
from sklearn.metrics import mean_squared_error


client = MongoClient()
client = MongoClient('localhost', 27017)
db = client.shopsite
reviewsCollections = db.reviews

regEx = re.compile('[^a-z]+')


def test(df3,dfReviews_train,dfReviews_test,lentrain,lentest):
    df5_train_target = df3["overall"][:lentrain]
    df5_test_target = df3["overall"][lentrain:lentrain+lentest]
    df5_train_target = df5_train_target.astype(int)
    df5_test_target = df5_test_target.astype(int)


    n_neighbors = 4
    knnclf = neighbors.KNeighborsClassifier(n_neighbors, weights='distance')
    knnclf.fit(dfReviews_train, df5_train_target)
    knnpreds_test = knnclf.predict(dfReviews_test)
     
    print("Accuracy: ",accuracy_score(df5_test_target, knnpreds_test))
    print("MSE: ",mean_squared_error(df5_test_target, knnpreds_test))



def cleanReviews(reviewText):
    reviewText = reviewText.lower()
    reviewText = regEx.sub(' ', reviewText).strip()
    return reviewText



def reloadReviews():
    global reviewsCollections
    arrayOfRreviews = reviewsCollections.find({}, {'_id': False})
    dfff = {}
    i=0
    for doc in arrayOfRreviews:
       dfff[i] = doc
       i += 1
    
    
        
    dff = pd.DataFrame.from_dict(dfff, orient='index')
   
 
    
    count = dff.groupby("asin", as_index=False).count()
    mean = dff.groupby("asin", as_index=False).mean()
    
    
    dfMerged = pd.merge(dff, count, how='right', on=['asin'])


    
    #rename
    dfMerged["totalReviewers"] = dfMerged["reviewerID_y"]
    dfMerged["overallScore"] = dfMerged["overall_x"]
    dfMerged["summaryReview"] = dfMerged["summary_x"]
    
    
    
    dfMerged = dfMerged.sort_values(by='totalReviewers', ascending=False)
    dfCount = dfMerged[dfMerged.totalReviewers >= 200]


    ProductReviewSummary = dfCount.groupby("asin")["summaryReview"].apply(list)
    ProductReviewSummary = pd.DataFrame(ProductReviewSummary)
    ProductReviewSummary.to_csv("ProductReviewSummary.csv")




def itemRecommender(item_id):
  #reloadReviews()

  dfProductReview = pd.read_csv('dfProductReview.csv')
  print(item_id)
  
  df3 = pd.read_csv("ProductReviewSummary.csv")
  df3 = pd.merge(df3, dfProductReview, on="asin", how='inner')


  df3 = df3[['asin','summaryReview','overall']]


  df3["summaryClean"] = df3["summaryReview"].apply(cleanReviews)
  df3 = df3.drop_duplicates(['overall'], keep='last')
  df3 = df3.reset_index()
  
  reviews = df3["summaryClean"] 
  countVector = CountVectorizer(max_features = 300, stop_words='english')
  transformedReviews = countVector.fit_transform(reviews)

  dfReviews = DataFrame(transformedReviews.A, columns=countVector.get_feature_names())
  dfReviews = dfReviews.astype(int)


  #dfReviews = pd.read_csv("dfReviews.csv")

  X = np.array(dfReviews)

  tpercent = 0.9
  tsize = int(np.floor(tpercent * len(dfReviews)))
  dfReviews_train = X[:tsize]
  dfReviews_test = X[tsize:]

  lentrain = len(dfReviews_train)
  lentest = len(dfReviews_test)

  


  neighbor = NearestNeighbors(n_neighbors=4, algorithm='ball_tree').fit(dfReviews_train)



  #TEST TGE RECOMMENDER
  #test(df3,dfReviews_train,dfReviews_test,lentrain,lentest) 

  distances, indices = neighbor.kneighbors(dfReviews_train)
  #print(indices,distances[26],distances[4])
  #print(distances[828],distances[769])
    

  for i in range(len(X)):
      a = neighbor.kneighbors([X[i]])
      related_product_list = a[1]
      first_related_product = [item[1] for item in related_product_list]
      first_related_product = str(first_related_product).strip('[]')
      first_related_product = int(first_related_product)
      second_related_product = [item[2] for item in related_product_list]
      second_related_product = str(second_related_product).strip('[]')
      second_related_product = int(second_related_product)
      third_related_product = [item[3] for item in related_product_list]
      third_related_product = str(third_related_product).strip('[]')
      third_related_product = int(third_related_product)
      #print(a,first_related_product,second_related_product,third_related_product)
      
      
      if df3["asin"][i] == item_id:
          recommenderProductsId = [df3["asin"][first_related_product],df3["asin"][second_related_product],df3["asin"][third_related_product]]
          return recommenderProductsId
          """
          print ("Based on product reviews, for ", df3["asin"][i] ," average rating is ",df3["overall"][i])
          print ("The first similar product is ", df3["asin"][first_related_product] ," average rating is ",df3["overall"][first_related_product])
          print ("The second similar product is ", df3["asin"][second_related_product] ," average rating is ",df3["overall"][second_related_product])
          print ("The second similar product is ", df3["asin"][third_related_product] ," average rating is ",df3["overall"][third_related_product])
          print ("-----------------------------------------------------------")
          """
      """  
      print ("Based on product reviews, for ", df3["asin"][100] ," average rating is ",df3["overall"][100])
      print ("The first similar product is ", df3["asin"][first_related_product] ," average rating is ",df3["overall"][first_related_product])
      print ("The second similar product is ", df3["asin"][second_related_product] ," average rating is ",df3["overall"][second_related_product])
      print ("The second similar product is ", df3["asin"][third_related_product] ," average rating is ",df3["overall"][third_related_product])
      """ 
      
      #print ("-----------------------------------------------------------")
     
  
    
      

      

if __name__ == '__main__':
    itemRecommender('B00DBV28TG')

    




    """
    cluster = df3.groupby("overall")["asin"].apply(list)
    #print(cluster)
    
    cluster = pd.DataFrame(cluster)
    cluster.to_csv("cluster.csv")
    cluster1 = pd.read_csv("cluster.csv")
    cluster1["summaryClean"] = cluster1["summary"].apply(cleanReviews)
    
    
    print(cluster1["summaryClean"][4])
    """
