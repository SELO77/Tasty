# -*- coding: utf-8 -*-

# python 2로 작성되었습니다.

import requests
from lxml import etree
from io import StringIO, BytesIO

domain = 'http://www.menupan.com'
baseUrl = "http://www.menupan.com/search/restaurant/restaurant_result.asp"
keyword = '%BC%AD%BF%EF%B4%EB%C0%D4%B1%B8'  #서울대입구 : escape('서울대입구')

# headers = {
# 	'Host': 'www.menupan.com',
# 	'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
# 	'Accept-Language': 'en-US,en;q=0.8,ko;q=0.6,zh-CN;q=0.4,zh;q=0.2',
# 	'Cache-Control': 'no-cache',
# 	'Connection': 'keep-alive',
# 	'Cookie': 'ASPSESSIONIDAQASRBDD=JEPELJGBFINJMBAHMLJDHCOG; ASPSESSIONIDCSDTTDBD=MJGGHCECKMABKMILAPBFHELB; cls_times_new=20160601%3B%3B%3B%3B%3B; m_resttop5=cn207; m_top_areasearch=ss; NoMemSessionID=160606%5F606562927%2E56; MP%5FOV=1465201249%3B%2Frestaurant%2Fonepage%2Easp%3Fakey%3Dh121038%26atype%3Dov; _ga=GA1.2.1601231095.1465112703; _gat=1',
# 	'Pragma': 'no-cache',
# 	'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36',
# 	'Upgrade-Insecure-Requests': '1',
# 	'Referer': 'http://www.menupan.com/search/restaurant/restaurant_result.asp?kw=%uC11C%uC6B8%uB300%uC785%uAD6C&page=1'
# }


def getHtml(url, data):
	response = requests.get(url, params=data)
	resultText = response.text

	# print(response.url)

	parser = etree.HTMLParser()
	htmlTree = etree.parse(StringIO(resultText), parser)
	# resultHtml = etree.tostring(tree.getroot(), pretty_print=True, method="html")
	# print(resultHtml)

	return htmlTree



storeList = []

# TODO: 결과가 없을 때까지 페이지를 반복시킬 것 
 
# loop pages
page = '1'
data = 'kw=%s&page=%s' % (keyword, page)

listResult = getHtml(baseUrl, data)
list = listResult.xpath('//ul[@class="listStyle3"]/li')

# loop stores
for li in list:
	itemHref = li.xpath('dl/dt/a')[0].get('href')
	itemUrl = '%s%s' % (domain, itemHref)

	itemBaseUrl = itemUrl.split('?')[0]
	itemData = itemUrl.split('?')[1]

	itemResult = getHtml(itemBaseUrl, itemData)
	# print(etree.tostring(itemResult.getroot(), pretty_print=True, method="html"))

	itemInfo = {}

	itemImageList = []

	itemImgList = itemResult.xpath('//ul[@id="id_restphoto_list_src"]/li/a/img')
	for imgA in itemImgList:
		title = imgA.get('title').strip()
		src = imgA.get('tag_src_z').strip()
		src = '%s%s' % (domain, src)

		itemImageList.append({
			'title': title,
			'url': src
		})

	itemInfo['imageList'] = itemImageList

	areaBasic = itemResult.xpath('//div[@class="areaBasic"]')[0]
	restName = areaBasic.xpath('dl[@class="restName"]/dd')[0].text.strip()
	restType = areaBasic.xpath('dl[@class="restType"]/dd')[0].text.strip()
	restTel = areaBasic.xpath('dl[@class="restTel"]/dd')[0].text.strip()
	restAdd1 = areaBasic.xpath('dl[@class="restAdd"]/dd[@class="add1"]/a')[0].text.strip()
	restAdd2 = areaBasic.xpath('dl[@class="restAdd"]/dd[@class="add2"]/a')[0].text.strip()
	restTheme = areaBasic.xpath('dl[@class="restTheme"]/dd')[0].text.strip()

	infoTable = itemResult.xpath('//div[@class="infoTable"]')[0]

	for infoLi in infoTable.xpath('ul/li'):
		if(len(infoLi.xpath('dl/dt')) > 0):
			infoTitle = infoLi.xpath('dl/dt')[0].text.strip()
			infoDesc = infoLi.xpath('dl/dd')[0].text.strip()

			# 키는 영어로 변환
			itemInfo[infoTitle] = infoDesc

	listR_wrap = itemResult.xpath('//ul[@id="listR_wrap_0"]/li')
	itemMenuList = []
	for menuLi in listR_wrap:
		menuName = menuLi.xpath('p[@class="menu"]/span/input')[0].get('value').strip()
		menuPrice = menuLi.xpath('p[@class="price"]')[0].text.strip()
		menuPrice = int(menuPrice.replace(u'원', '').replace(',', ''))

		itemMenuList.append({
			'name': menuName,
			'price' : menuPrice
		})

	itemInfo['menuList'] = itemMenuList

	# TODO: 좌표 추가, 주소를 좌표로 변환하는 방법을 사용.(메뉴판의 좌표는 x,y 형태이다.)

	storeList.append(itemInfo)

# TODO: storeList로 파일을 생성해야 한다.