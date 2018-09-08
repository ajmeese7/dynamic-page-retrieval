from contextlib import closing
from selenium.webdriver import Firefox # pip install selenium
from selenium.webdriver.support.ui import WebDriverWait

# use firefox to get page with javascript generated content
def request( URL, ID ):
    # URL: Page link that you want to scrape
    # ID: ID of element on page that you want to wait for
    with closing(Firefox()) as browser:
         browser.get(URL)
         # wait for the page to load
         WebDriverWait(browser, timeout=10).until(
             lambda x: x.find_element_by_id(ID))
         # store it to string variable
         page_source = browser.page_source
    print(page_source.encode("utf-8"))

request("https://www.nasa.gov/multimedia/imagegallery/iotd.html", "gallery-list")
