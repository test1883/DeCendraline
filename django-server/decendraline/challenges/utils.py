
import os
os.environ['OPENAI_API_KEY'] = "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"

#import streamlit as st
# Set the title using StreamLit
#st.title(' Geeks For Geeks ')
#input_text = st.text_input('Enter Your Text: ') 
 
 
from langchain.prompts import PromptTemplate
# setting up the prompt templates
title_template = PromptTemplate(
    input_variables = ['duration', 'type', 'difficulty', 'place'], 
    template='you are an extremely adventurous person who has a great experience in various challenges, challenge the user based on duration(approx) - {duration}, type - {type}, difficulty(very easy/easy/medium/hard/very hard/extreme) - {difficulty} in {place}, be specific about it and give a unique challenge. give just one challenge. keep human capabilities in mind and keep the challenge realistic. include all the human necessities in the duration'
)

 
from langchain.llms import OpenAI
# Importing the large language model OpenAI via langchain
model = OpenAI(temperature=0.6) 
 
from langchain.chains import LLMChain
chainT = LLMChain(llm=model, prompt=title_template, verbose=True, output_key='message')

def challenge(duration, type, difficulty, place):
    message = chainT.invoke({"duration": duration, "type": type, "difficulty": difficulty, "place": place})
    return message
    
from airpyllution.airpyllution import get_air_pollution

def weather(lat, lon):
    pollution_map = get_air_pollution(lat, lon, "b5867aac6b2d02d59e0b93eb5aa08001", "Current Air Pollution")
    return (pollution_map["data"][6]["marker"]["size"][0])