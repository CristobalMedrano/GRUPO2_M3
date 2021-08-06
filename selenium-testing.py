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
            options=options, executable_path='./chromedriver')

    def test_read_main_title(self):
        driver = self.driver
        driver.get("http://localhost:3000")
        delay = 10  # seconds
        wait = WebDriverWait(driver, delay)
        title = wait.until(EC.presence_of_element_located(
            (By.ID, 'title')))
        self.assertEqual(title.text, "Educación Continua")

    def test_read_main_subtitle(self):
        driver = self.driver
        driver.get("http://localhost:3000")
        delay = 10  # seconds
        wait = WebDriverWait(driver, delay)
        item = wait.until(lambda d: d.find_element_by_tag_name("a"))
        self.assertEqual(item.text, "Educación Continua\nDiplomados")

    def test_click_diplomate(self):
        # Se conecta a la pagina
        driver = self.driver
        driver.get("http://localhost:3000")
        # Espera que se cargue durante 5 segundos
        time.sleep(5)
        # Busca el boton incribete ahora
        diplomate_list_button = driver.find_element(
            By.LINK_TEXT, "¡INSCRÍBETE AHORA!")
        # Le da click al boton
        webdriver.ActionChains(driver).click(
            diplomate_list_button).perform()
        # La transicion toma tiempo por eso los 3 segundos
        time.sleep(3)
        # Se busca el titulo del primer diplomado que encuentre
        diplomate_title = driver.find_element(
            By.XPATH, "//div[starts-with(@id, 'diplomado-')]/div/div/div[@class='card-title h5']")
        # Se guarda el titulo encontrado
        diplomate_preview_title = diplomate_title.text
        # Se busca el boton ver detalles del diplomado
        diplomate_button = driver.find_element(
            By.XPATH, "//div[starts-with(@id, 'diplomado-')]//button")
        # Se apreta el boton ver detalles
        webdriver.ActionChains(driver).click(
            diplomate_button).perform()
        delay = 10  # seconds
        # Se espera que la pagina cargue
        wait = WebDriverWait(driver, delay)
        # Busca si el titulo del diplomado que cargó es igual al que tenia el anterior.
        loaded_diplomate_title = wait.until(EC.presence_of_element_located(
            (By.ID, 'title')))
        # Compara ambos titulos.
        self.assertEqual(loaded_diplomate_title.text, diplomate_preview_title)
    
    #Test que clickea boton de la secretaria y asegura que cargue la vista
    def test_secretary(self):
        driver = self.driver
        driver.get("http://localhost:3000")
        delay = 10  # seconds
        secretary_button = driver.find_element(By.XPATH, "//body/div[@id='root']/nav[1]/div[1]/div[2]/div[1]/a[1]/div[1]")
        webdriver.ActionChains(driver).click(secretary_button).perform()
        driver.save_screenshot("screenshot.png")
        title_element = driver.find_element_by_xpath("//*[contains(text(), 'Listado de postulaciones a diplomados 1-2021')]")
        self.assertEqual(title_element.text, 'Listado de postulaciones a diplomados 1-2021')
    
    #Test que clickea boton del consejo de postulacion y asegura que cargue la vista
    def test_council(self):
        driver = self.driver
        driver.get("http://localhost:3000")
        delay = 10  # seconds
        secretary_button = driver.find_element(By.XPATH, "//body/div[@id='root']/nav[1]/div[1]/div[2]/div[2]/a[1]/div[1]")
        webdriver.ActionChains(driver).click(secretary_button).perform()
        driver.save_screenshot("screenshot.png")
        title_element = driver.find_element_by_xpath("//*[contains(text(), 'Listado de postulaciones a diplomados 1-2021')]")
        self.assertEqual(title_element.text, 'Listado de postulaciones a diplomados 1-2021')        

    def tearDown(self):
        self.driver.quit()


if __name__ == "__main__":
    unittest.main()
