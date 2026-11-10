import java.util.Random;

/**
 * Programa en Java para generar, ordenar y analizar un array de 100 números enteros (dígitos/números).
 * Muestra en pantalla el menor, el elemento medio (mediana) y el mayor tras la ordenación.
 * 
 * Basado en las estructuras de almacenamiento (arrays) y algoritmos de ordenación del Tema 6.
 */
public class OrdenacionArray {

    public static void main(String[] args) {
        int tamano = 100;
        int[] numeros = new int[tamano];
        Random random = new Random();

        // 1. Inicialización del array con 100 valores aleatorios entre 0 y 999
        for (int i = 0; i < numeros.length; i++) {
            numeros[i] = random.nextInt(1000);
        }

        // Mostrar array original (primeros 10 elementos como muestra)
        System.out.println("=== ARRAY ORIGINAL (Primeros 10 elementos de muestra) ===");
        imprimirMuestra(numeros, 10);

        // 2. Ordenación del array empleando el Algoritmo de la Burbuja (Bubble Sort)
        // También se podría emplear Arrays.sort(numeros);
        ordenarBurbuja(numeros);

        System.out.println("\n=== ARRAY ORDENADO (Primeros 10 elementos de muestra) ===");
        imprimirMuestra(numeros, 10);

        // 3. Obtención y visualización de los valores clave
        int menor = numeros[0];                              // El primer elemento tras ordenar es el menor
        int medio = numeros[numeros.length / 2];              // El elemento central (índice 50)
        int mayor = numeros[numeros.length - 1];              // El último elemento tras ordenar es el mayor

        System.out.println("\n=== RESULTADOS ===");
        System.out.println("Menor valor (índice 0): " + menor);
        System.out.println("Valor medio (índice " + (tamano / 2) + "): " + medio);
        System.out.println("Mayor valor (índice " + (tamano - 1) + "): " + mayor);
    }

    /**
     * Método para ordenar un array de enteros mediante el algoritmo de la burbuja.
     * @param array Array de enteros a ordenar en orden ascendente.
     */
    public static void ordenarBurbuja(int[] array) {
        int n = array.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - 1 - i; j++) {
                if (array[j] > array[j + 1]) {
                    // Intercambiar elementos
                    int temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
    }

    /**
     * Método auxiliar para imprimir una muestra de elementos del array.
     */
    public static void imprimirMuestra(int[] array, int cantidad) {
        System.out.print("[");
        for (int i = 0; i < cantidad; i++) {
            System.out.print(array[i] + (i < cantidad - 1 ? ", " : ""));
        }
        System.out.println(", ...]");
    }
}
