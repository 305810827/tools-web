filePath = './server/file/'
import os
from pdf2docx import Converter

for file in os.listdir(filePath):
    print (file)
    file_last_name=file.split('.')[1]
    if file_last_name !='pdf':
        continue
    else:
        pdf_name = file.split('.')[0]
        word_name=pdf_name+'.docx'
        cv=Converter(file)
        cv.convert(word_name)
        cv.close()
