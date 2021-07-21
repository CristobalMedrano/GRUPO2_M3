package com.mycompany.grupo2;

import org.junit.Test;
import static org.junit.Assert.*;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.Webelement;
import org.openqa.selenium.WebDriverWait;

/**
 * El objetivo de ese archivo es arrancar la página principal de frontend usando con selenium
 * Para hacerlo, primero necesita modificar los findElement en función de css de la página
 * Luego, al encontrar todos los enementos, arranca usando Test File para automatizar el resultado
 * Necesita solucionar la librería para acceder con selenium en el xml y este archivo.
 * @author Martin
 */
public class FrontEndIT {

    private static WebDriver driver = null;
    
    public FrontEndIT() {
    }

    @BeforeClass
    public static void inicializarDriver(){
        //la alternativa es FirefoxDriver()
        driver = new ChromeDriver();
    }

    @AfterClass
    public static void finalizarDriver(){
        driver.quit();
    }


    @org.junit.Test
    public void comprobarTestsFrontEnd() {
        driver.get("http://localhost:3000/");

        //en el id origen es por defecto de encontrar la página con el ese elemento. EL ejemplo es un sendKeys
        WebElement origenElem = driver.findElement(By.id("origen"));

        //en el id aceptar es por defecto de encontrar la página con el ese elemento. el ejemplo es un click
        WebElement cmdAceptar = driver.findElement(By.id("aceptar"));

        //en el wait, es cuando hace la espera para realizar esa operación.
        WebDriverWait wait = new WebDriverWait(driver, 5);
        WebElement homeElem = driver.findElement(By.id("home"));
        wait.until(ExpectedConditions.visibilityOf(homeElem));

    }
    
}
