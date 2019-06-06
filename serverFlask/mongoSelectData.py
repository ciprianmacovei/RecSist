#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Dec 25 21:32:39 2018

@author: cip
"""
from pymongo import MongoClient
import pandas as pd
import gzip
import numpy as np

client = MongoClient('mongodb://localhost:27017/')
db = client.shopsite



def parse(path):
  g = gzip.open(path, 'r')
  for l in g:
    yield eval(l)


def getDF(path):
  i = 0
  df = {}
  for d in parse(path):
    df[i] = d
    i += 1
  return pd.DataFrame.from_dict(df, orient='index')


#df = getDF('./reviews_Electronics_5.json.gz')


revItems = pd.read_csv("ProductReviewSummary.csv")
X = np.array(revItems)


ids_array = []
for i in range(len(X)):
    ids_array.append(X[i][0])



result = db.items.delete_many({'asin':{'$nin':ids_array}})
