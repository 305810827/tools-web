file_path = './server/file/'
import os
from docx2pdf import convert
file_path = os.getcwd()

file_name = '221685517939690.docx'
print(file_path, 'file_path')

for file in os.listdir(file_path):
    print(file, 'file')
    file_last_name=file.split('.')[1]
    if file_name == file and file_last_name =='docx':
        pdf_name = file.split('.')[0]
        word_name = pdf_name+'.pdf'
        convert(file)
        convert(file, word_name)
        convert('file/')


