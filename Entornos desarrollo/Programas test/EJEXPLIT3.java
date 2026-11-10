import java.util.Scanner;
public class EJEXPLIT3 {
    public static void main(String[] args) {
        Scanner sc= new Scanner(System.in);

        System.out.println("Introduce el dividendo: ");
        int dividendo = sc.nextInt();
        
        System.out.println("Introduce el divisor");
        int divisor = sc.nextInt();

        System.out.println("El dividendo es: " + dividendo);
        System.out.println("El divisor es: " + divisor);

        int resultado = dividendo/divisor;

        System.out.println("El resultado es: " + resultado);
        
        sc.close();
    }
}
