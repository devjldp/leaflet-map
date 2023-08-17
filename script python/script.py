import json

def getData(url):
    with open(url, encoding="utf8") as data:
        arte = json.load(data)
    return arte

def transformData(name, data):
    with open(name, 'w', encoding="utf8") as f:
      json.dump(data,f, indent=2, ensure_ascii=False)


romanico = getData('./rawjson/m.json')
length = len(romanico['articles']['article'])
print(length)
for i in range(length-1):
  print(romanico["articles"]["article"][i]["dynamic-element"][0]["dynamic-content"]["content"])
  print(romanico["articles"]["article"][i]["dynamic-element"][1]["dynamic-element"][0]["dynamic-content"]["content"])
  print(romanico["articles"]["article"][i]["dynamic-element"][5]["dynamic-element"]["dynamic-content"]["content"])
  # print(romanico["articles"]["article"][i]["dynamic-element"][4]["dynamic-element"]["dynamic-content"]["content"] )
  print('----------------------')

data = {}
for i in range(length):
    coordinates = romanico["articles"]["article"][i]["dynamic-element"][5]["dynamic-element"]["dynamic-content"]["content"].split(',')
    element = {'name': romanico["articles"]["article"][i]["dynamic-element"][0]["dynamic-content"]["content"],
              'location': romanico["articles"]["article"][i]["dynamic-element"][1]["dynamic-element"][0]["dynamic-content"]["content"],
              'lat': float(coordinates[0]),
              'lon': float(coordinates[1]),
              'web': ""}
    #print(element)
    data[i] = element
transformData('museums.json', data)

"""
for i in range(length):
  if('Xisco' in romanico["articles"]["article"][i]["dynamic-element"][1]["dynamic-content"]["content"]):
    print(romanico["articles"]["article"][i]["dynamic-element"][1]["dynamic-content"]["content"])

for i in range(95):
  print(romanico["articles"]["article"][i]["dynamic-element"][1]["dynamic-content"]["content"])
  print(romanico["articles"]["article"][i]["dynamic-element"][2]["dynamic-element"][0]["dynamic-content"]["content"])
  print(romanico["articles"]["article"][i]["dynamic-element"][12]["dynamic-element"]["dynamic-content"]["content"])
  print('----------------------')
for i in range(95, length-1):
  print(romanico["articles"]["article"][i]["dynamic-element"][1]["dynamic-content"]["content"])
  print(romanico["articles"]["article"][i]["dynamic-element"][2]["dynamic-element"][0]["dynamic-content"]["content"])
  print(romanico["articles"]["article"][i]["dynamic-element"][11]["dynamic-element"]["dynamic-content"]["content"])
  print('----------------------')
#for i in range(95):
  #print(romanico["articles"]["article"][i]["dynamic-element"][12]["dynamic-element"]["dynamic-content"]["content"])

print(romanico["articles"]["article"][360]["dynamic-element"][12]["dynamic-element"]["dynamic-content"]["content"])




data = {}
for i in range(95):
    coordinates = romanico["articles"]["article"][i]["dynamic-element"][12]["dynamic-element"]["dynamic-content"]["content"].split(',')
    element = {'name': romanico["articles"]["article"][i]["dynamic-element"][1]["dynamic-content"]["content"],
              'location': romanico['articles']['article'][i]['dynamic-element'][2]['dynamic-element'][0]['dynamic-content']['content'],
              'lat': float(coordinates[0]),
              'lon': float(coordinates[1]),
              'stars': 0, 
              'web': ""}
    #print(element)
    data[i] = element


for i in range(95,length-1):
    coordinates = romanico["articles"]["article"][i]["dynamic-element"][11]["dynamic-element"]["dynamic-content"]["content"].split(',')
    element = {'name': romanico["articles"]["article"][i]["dynamic-element"][1]["dynamic-content"]["content"],
              'location': romanico['articles']['article'][i]['dynamic-element'][2]['dynamic-element'][0]['dynamic-content']['content'],
              'lat': float(coordinates[0]),
              'lon': float(coordinates[1]),
              'stars': 0, 
              'web': ""}
    data[i] = element
    print('-------------------------')

transformData('events.json', data)
# name: romanico['articles']['article'][0'Esto varia']['dynamic-element'][0]['dynamic-content']['content']
# location : romanico['articles']['article'][0]['dynamic-element'][1]['dynamic-element'][0]['dynamic-content']['content']
# coordinates: romanico['articles']['article'][0]['dynamic-element'][4]['dynamic-element']['dynamic-content']['content']
# web: romanico['articles']['article'][0]['dynamic-element'][1]['dynamic-element'][7]['dynamic-content']['content']




name: ["articles"]["article"][0]["dynamic-element"][0]["dynamic-content"]["content"]
Location: ["articles"]["article"][0]["dynamic-element"][1]["dynamic-element"][3]["dynamic-content"]["content"] 
date: ["articles"]["article"][0]["dynamic-element"][1]["dynamic-element"][4]["dynamic-content"]["content"]
web: ["articles"]["article"][0]["dynamic-element"][1]["dynamic-element"][6]["dynamic-content"]["content"] 
coordenadas: ["articles"]["article"][0]["dynamic-element"][4]["dynamic-element"]["dynamic-content"]["content"] 
"""