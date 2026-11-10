public class Perro {
    private String raza;
    private String nombre;
    private int edad;
    private boolean vacunado;

    public Perro(String razaPerro, String nombrePerro, int edadPerro, boolean estaVacunado) {
         this.raza = razaPerro;
            this.nombre = nombrePerro;
            this.edad = edadPerro;
            this.vacunado = estaVacunado;
    }

    public void ladrar() {
        System.out.println("\n Guau Guau");
    }

    public void informacionPerro() {
        
    }

    public void setEdad(int edadNueva) {
    }

    public void setNombre(String nombreNuevo) {
    }

    public void setRaza(String razaNueva) {
    }

    public void setVacunado(boolean vacunadoNuevo) {
    }

    public int getEdad() {
        return 0;
    }

    public String getNombre() {
        return "";
    }

    public String getRaza() {
        return "";
    }

    public boolean getVacunado() {
        return false;
    }

}