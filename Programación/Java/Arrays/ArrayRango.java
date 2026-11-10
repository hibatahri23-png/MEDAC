public class ArrayRango {
    public static void main(String[] args) {
        // El rango de -50 a 50 (ambos inclusive) comprende 101 números: 50 - (-50) + 1
        int longitud = 101;
        int[] numeros = new int[longitud];

        // Rellenar el array mediante iteración
        for (int i = 0; i < numeros.length; i++) {
            numeros[i] = -50 + i;
        }

        // Mostrar los elementos del array por pantalla
        System.out.println("Elementos del array de -50 a 50:");
        for (int i = 0; i < numeros.length; i++) {
            System.out.print(numeros[i] + " ");
        }
    }
}