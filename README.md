# Kaffeehaus

Bangkit Capstone Project by C23-PS256

Machine Learning Repository

## List Of Code

  - [Collecting Data](https://github.com/Bangkit-Capstone-C23-PS256/Kaffeehaus_Machine_Learning/tree/main/Collecting%20Data) 
    
    We collect place detail using Google API named Google Place Detail API.
    Data that we collect is `'place name','address','place_id','rating','total review','review text','longitude & latitude','photo url','contact',and 'maps url'`
  
  - [Rangking Score](https://github.com/Bangkit-Capstone-C23-PS256/Kaffeehaus_Machine_Learning/tree/main/Rangking%20Score) 
    
    In the `Ranking Score` folder, you will find code for ranking cafes based on their `rating` and `total_review`. Once ranked, the cafes will be sorted from the lowest rank to the highest.

    In addition to the ranking code, there will be a machine learning model that predicts the cafe's `score` based on its `rating` and `total reviews`. This model enhances the ability to estimate the cafe's performance using these factors.

  - [Keyword Extraction](https://github.com/Bangkit-Capstone-C23-PS256/Kaffeehaus_Machine_Learning/tree/main/Keyword%20Extraction)
    
    There will be `Keyword Extraction` code in this folder, the code will be used for extract the keyword from `review_text` into keywords, after that we will use the keyword as parameter in making recommendation and searching feature
    
  - [Searching Model](https://github.com/Bangkit-Capstone-C23-PS256/Kaffeehaus_Machine_Learning/tree/main/Tensorflow%20%20Words%20Embedding%20Model)

    Using Word Embeding and Cosine Similarity to make next level searching model, user can input query like: `Cafe that has a JKT48 vibes` it will return cafe that has the attribute that user input before.
    
  - [Content Based Filtering](https://github.com/Bangkit-Capstone-C23-PS256/Kaffeehaus_Machine_Learning/tree/main/Content%20Based%20Filtering)
 
    For recommender system in our application we use content based filtering, it wll be give a cafe recomendation based on user preference or it will give cafe recommendation that has similar attribute with cafe that user like

