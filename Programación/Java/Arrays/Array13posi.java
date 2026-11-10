import java.util.Scanner;

public class Array13posi {
    public static void main(String[] args) {
        //En este programa se hará un vector de 13 posiciones las cuales habrán notas del 1 hasta el 10, también se dirá el nr de aprobados, suspendidos y sobresalientes.
        Scanner sc = new Scanner(System.in);
        int longitud = 13;
        int[] notas = new int[longitud];
        int aprobados = 0;
        int suspendidos = 0;
        int sobresalientes = 0;

        for (int i = 0; i < notas.length; i++) {
            int nota;
            do {
                System.out.print("Introduce la nota " + (i + 1) + " (1-10): ");
                nota = sc.nextInt();
                if (nota < 1 || nota > 10) {
                    System.out.println("La nota debe estar entre 1 y 10.");
                }
            } while (nota < 1 || nota > 10);

            notas[i] = nota;
            if (nota < 5) {
                suspendidos++;
            } else {
                aprobados++;
                if (nota >= 9) {
                    sobresalientes++;
                }
            }
        }

        System.out.println("Aprobados: " + aprobados);
        System.out.println("Suspendidos: " + suspendidos);
        System.out.println("Sobresalientes: " + sobresalientes);
        sc.close();
    }
}
