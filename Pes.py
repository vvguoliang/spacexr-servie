import requests
from bs4 import BeautifulSoup
import json
import os

dirct = 'E:\git\spacexr-servie\\api_service\image\photos'
files = os.listdir(dirct)  # 文件夹下所有目录的列表


# print('files:', files)

# 创建文件夹
def filemdikr(make):
    os.makedirs(make)


# 创建单项下载图片
def filedow(url, address, name):
    imgresponse = requests.get(url, stream=True)  # 以流的方式打开
    image = imgresponse.content
    try:
        with open(address + '\\' + name + '.jpeg', "wb") as jpeg:
            jpeg.write(image)
    except IOError:
        print("IO Error\n")
    finally:
        jpeg.close()


def filedocwnd(files, photossrc, photosid):
    dir = []
    dname = []
    dir.append(photossrc['original'])
    dir.append(photossrc['large2x'])
    dir.append(photossrc['large'])
    dir.append(photossrc['medium'])
    dir.append(photossrc['small'])
    dir.append(photossrc['portrait'])
    dir.append(photossrc['landscape'])
    dir.append(photossrc['tiny'])

    dname.append('original')
    dname.append('large2x')
    dname.append('large')
    dname.append('medium')
    dname.append('small')
    dname.append('portrait')
    dname.append('landscape')
    dname.append('tiny')
    if len(files) > 0:
        if str(photosid) in files:
            return
        else:
            filemdikr(dirct + '\\' + str(photosid))
            for (i, dirs) in enumerate(dir):
                filedow(dirs, dirct + '\\' + str(photosid), dname[i])
    else:
        filemdikr(dirct + '\\' + str(photosid))
        for (i, dirs) in enumerate(dir):
            filedow(dirs, dirct + '\\' + str(photosid), dname[i])


# 添加请求头
headers = {
    'Authorization': '563492ad6f91700001000001338acd8fa54c43cdb27a4d1474e632f5'
}
num = 0

# 循环下载 分页加载
def forreqUrl(type):
    global num
    request_url = "https://api.pexels.com/v1/curated/?page=" + type + "&per_page=80"
    data = requests.get(request_url, headers=headers)

    data.encoding = 'utf-8'
    data_price = json.loads(data.text)
    data_price1 = data_price['photos']
    for photos in data_price1:
        print(str(photos['id']) + '====' + str(photos['src']))
        num += 1
        print(num)
        filedocwnd(files, photos['src'], photos['id'])
        if num == 80:
            if 'next_page' in data_price:
                next_page1 = data_price['next_page']
                next_pages = str(next_page1).split('?')
                next_pages1 = next_pages[1].split('&')
                next_pages2 = next_pages1[0].split('=')
                num = 0
                forreqUrl(str(next_pages2[1]))
            else:
                print('结束')


request_url = "https://api.pexels.com/v1/curated/?page=2&per_page=80"
data = requests.get(request_url, headers=headers)
data.encoding = 'utf-8'
data_price = json.loads(data.text)
data_price1 = data_price['photos']

for photos in data_price1:
    print(str(photos['id']) + '====' + str(photos['src']))
    num += 1
    print(num)
    filedocwnd(files, photos['src'], photos['id'])
    if num == 80:
        if 'next_page' in data_price:
            next_page1 = data_price['next_page']
            next_pages = str(next_page1).split('?')
            next_pages1 = next_pages[1].split('&')
            next_pages2 = next_pages1[0].split('=')
            num = 0
            forreqUrl(str(next_pages2[1]))
        else:
            print('结束')
