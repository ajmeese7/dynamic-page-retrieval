from contextlib import closing
from selenium.webdriver import Firefox # pip install selenium
from selenium.webdriver.support.ui import WebDriverWait

URL = "https://www.nasa.gov/multimedia/imagegallery/iotd.html"

# use firefox to get page with javascript generated content
with closing(Firefox()) as browser:
     browser.get(URL)
     # wait for the page to load
     WebDriverWait(browser, timeout=10).until(
         lambda x: x.find_element_by_id('gallery-list'))
     # store it to string variable
     page_source = browser.page_source
print(page_source.encode("utf-8"))
