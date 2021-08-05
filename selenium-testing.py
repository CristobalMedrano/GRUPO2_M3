from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.chrome.options import Options

import time
import unittest


class SeleniumTesting(unittest.TestCase):

    def setUp(self):
        options = Options()
        options.headless = True
        options.add_argument("--window-size=1920,1200")
        self.driver = webdriver.Chrome(
            options=options, executable_path='chromedriver')

    def test_read_main_title(self):
        driver = self.driver
        url = "http://localhost:3000"
        driver.get(url)
        delay = 10  # seconds
        wait = WebDriverWait(driver, delay)
        title = wait.until(EC.presence_of_element_located(
            (By.ID, 'title')))
        self.assertEqual(title.text, "Educación Continua")


if __name__ == "__main__":
    unittest.main()
