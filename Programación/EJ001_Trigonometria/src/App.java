import java.util.Scanner;

public class App {
    public static void main(String[] args) throws Exception {
        //Declaro un obj tipo escaner y le digo que lea del teclado
        Scanner sc= new Scanner(System.in);
        System.out.println("Please, introduce un nr de grados: ");
        int grados = sc.nextInt();
        System.out.println("Los grados introduced son= " + grados);
        
        double sine = Math.sin(grados);
        System.out.println("El seno es: " + sine);
        double coseno = Math.cos(grados);
        System.out.println("El coseno es: " + coseno);
        double tangente = Math.tan(grados);
        System.out.println("La tangente es: " + tangente);

    }
}
