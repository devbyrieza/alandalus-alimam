import openpyxl
wb = openpyxl.load_workbook('REKAP HASIL TES.xlsx', data_only=False)
sheet = wb['AQ']
print('F2 formula:', sheet['F2'].value)
