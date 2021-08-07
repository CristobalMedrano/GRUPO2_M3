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
        options.headless = False
        options.add_argument("--window-size=1920,1200")
        self.driver = webdriver.Chrome(
            options=options, executable_path='chromedriver')


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
    '''
    Ideas verificar en secretaria, postulaciones, también en consejo y postulaciones
    assertEqual <- "seteo de casos conocidos"
    Por ejemplo cantidad de postulaciones o ID de estas últimas

    '''

    def test_click_postulation(self):
            # Setteo de inicio
            driver = self.driver
            driver.get("http://localhost:3000")
            # Se dan 4 segundos para que cargue la página
            time.sleep(4)

            # Se ingresa como secretaria
            to_log_in = driver.find_element(By.XPATH, '//*[@id="root"]/nav[1]/div/div[2]/div[3]/a')

            webdriver.ActionChains(driver).click(
            to_log_in).perform()
            # Se da tiempo para que cargue la página de postulaciones en vista de secretaria
            time.sleep(4)


            # Se ingresa a las postulaciones de ciberseguridad por la vista de secretaria
            to_secretaria = driver.find_element(By.XPATH, "//*[@id='root']/div[2]/div/div/div/div[1]/button")
            webdriver.ActionChains(driver).click(to_secretaria).perform()

            # Se espera a que cargue la página
            time.sleep(4)

            # Se obtiene el texto de titulo del diplomado
            to_ciberseguridad = driver.find_element(By.XPATH, '//*[@id="root"]/div[2]/div/div/div/div/div/div/div[2]/div/div[1]/div/div/div[1]/div')
            title_ciberseguridad = to_ciberseguridad.text


            # Se ingresa al diplomado de ciberseguridad
            to_in_ciberseguridad = driver.find_element(By.XPATH, '//*[@id="root"]/div[2]/div/div/div/div/div/div/div[2]/div/div[1]/div/div/div[3]/button')
            webdriver.ActionChains(driver).click(to_in_ciberseguridad).perform()


            # Se otorga un tiempo de espera
            delay = 10
            wait = WebDriverWait(driver, delay)
            # Se obtiene el nombre del diplomado, por su id
            loaded_ciberseguridad_title = wait.until(EC.presence_of_element_located(
                        (By.ID, 'title')))
            # Se comparan ambos titulos
            self.assertEqual(loaded_ciberseguridad_title.text, title_ciberseguridad)



    def tearDown(self):
        self.driver.quit()


if __name__ == "__main__":
    unittest.main()
