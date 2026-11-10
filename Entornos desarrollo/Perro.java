public class Perro {

        private String raza;
        private String nombre;
        private int edad;
        private boolean vacunado;

        public Perro(String razaPerro, String nombrePerro, int edadPerro, boolean estaVacunado){
            this.raza = razaPerro;
            this.nombre = nombrePerro;
            this.edad = edadPerro;
            this.vacunado = estaVacunado;
        }

        public void ladrar(){
                System.out.println("\n Guau Guau");
        }

        public void informacionPerro(){
                System.out.println("\nNombre "+ this.nombre);
                System.out.println(" Raza "+ this.raza);
                System.out.println(" Edad "+ this.edad);
        }

        public void setEdad(int edadNueva){
                if(edadNueva >= 0 && edadNueva <= 20){
                        this.edad = edadNueva;
                }
                else{
                        System.out.println("\nLa edad introducida no es válida");
                }
        }

        public void setNombre(String nombreNuevo){
                this.nombre = nombreNuevo;
        }

        public void setRaza(String razaNueva) {
            this.raza = razaNueva;
        }
        public void  setVacunado(boolean vacunadoNuevo){
                this.vacunado = vacunadoNuevo;
        }

        public int getEdad() {
            return edad;
        }
        public String getNombre() {
            return nombre;
        }
        public String getRaza() {
            return raza;
        }
        public boolean getVacunado(){
                return this.vacunado;
        }
}       
