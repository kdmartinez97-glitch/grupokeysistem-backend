const db = require('../config/db');
const Category = require('../models/Category');
const Product = require('../models/Product');

const productsToInsert = [
    {
        nombre: "Escritorio ejecutivo Zadar 120 Roble",
        descripcion: "Escritorio ejecutivo fabricado en tablero aglomerado grado E1 con acabado en melamina importado Schattdecor. Cuenta con cubierta pasacables abatible para una mejor organización del cableado. Su estructura incorpora patas metálicas tipo marco en acero de 60 x 30 mm, con pintura electrostática en polvo y espesor de pared de 1.5 mm. Dimensiones: 120x60x75 cm.",
        marca: "MBK STUDIO",
        precio: 0.00,
        stock: 10,
        estado: 'activo',
        imagen_url: ''
    },
    {
        nombre: "Escritorio ejecutivo Zadar 160 Roble",
        descripcion: "Escritorio ejecutivo fabricado en tablero aglomerado grado E1 con acabado en melamina importado Schattdecor. Cuenta con cubierta pasacables abatible para una mejor organización del cableado. Su estructura incorpora patas metálicas tipo marco en acero de 60 x 30 mm, con pintura electrostática en polvo y espesor de pared de 1.5 mm. Dimensiones: 160x80x75 cm.",
        marca: "MBK STUDIO",
        precio: 0.00,
        stock: 10,
        estado: 'activo',
        imagen_url: ''
    },
    {
        nombre: "Escritorio ejecutivo lateral Zadar 160 Roble",
        descripcion: "Escritorio ejecutivo fabricado en tablero aglomerado grado E1 con acabado en melamina. Cuenta con cubierta pasacables abatible para facilitar la gestión del cableado. Su estructura incorpora patas metálicas tipo marco en acero de 60 x 30 mm, con pintura electrostática en polvo y espesor de pared de 1.5 mm. Dimensiones: 160x140x75 cm.",
        marca: "MBK STUDIO",
        precio: 0.00,
        stock: 10,
        estado: 'activo',
        imagen_url: ''
    },
    {
        nombre: "Escritorio ejecutivo lateral Zadar 180 Roble",
        descripcion: "Escritorio ejecutivo fabricado en tablero aglomerado grado E1 con acabado en melamina. Cuenta con cubierta pasacables abatible para facilitar la gestión del cableado. Su estructura incorpora patas metálicas tipo marco en acero de 60 x 30 mm, con pintura electrostática en polvo y espesor de pared de 1.5 mm. Dimensiones: 180x160x75 cm.",
        marca: "MBK STUDIO",
        precio: 0.00,
        stock: 10,
        estado: 'activo',
        imagen_url: ''
    },
    {
        nombre: "Estación de 2 personas Zadar Roble",
        descripcion: "Estación de trabajo para 2 personas fabricada en tablero aglomerado grado E1 con acabado en melamina. Cuenta con cubiertas con pasacables tipo grommet para facilitar la gestión del cableado y panel divisor en tela para mayor privacidad entre usuarios. Su estructura incorpora patas metálicas tipo marco en acero de 60 x 30 mm, con pintura electrostática en polvo y espesor de pared de 1.5 mm. Dimensiones: 120x120x75 cm.",
        marca: "MBK STUDIO",
        precio: 0.00,
        stock: 10,
        estado: 'activo',
        imagen_url: ''
    },
    {
        nombre: "Estación de 4 personas Zadar Roble",
        descripcion: "Estación de trabajo para 4 personas fabricada en tablero aglomerado grado E1 con acabado en melamina. Cuenta con cubiertas con pasacables tipo grommet para facilitar la gestión del cableado y panel divisor en tela para mayor privacidad entre usuarios. Su estructura incorpora patas metálicas tipo marco en acero de 60 x 30 mm, con pintura electrostática en polvo y espesor de pared de 1.5 mm. Dimensiones: 240x120x75 cm.",
        marca: "MBK STUDIO",
        precio: 0.00,
        stock: 10,
        estado: 'activo',
        imagen_url: ''
    },
    {
        nombre: "Credenza Zadar 160 Roble",
        descripcion: "Credenza fabricada en tablero aglomerado grado E1 con acabado en melamina importado Schattdecor. Cuenta con cuatro gabinetes con puertas abatibles, cerradura con llave, jaladeras de aluminio en color negro y bisagras de cierre suave. Dimensiones: 160x40x84 cm.",
        marca: "MBK STUDIO",
        precio: 0.00,
        stock: 10,
        estado: 'activo',
        imagen_url: ''
    },
    {
        nombre: "Archivero Melamina 2+1 Zadar Roble",
        descripcion: "Archivero móvil fabricado en tablero aglomerado grado E1 con acabado en melamina. Cuenta con tres cajones, correderas telescópicas de balines de triple extensión, cerradura central con llave y jaladeras de aluminio en color negro. Incluye ruedas universales para facilitar su desplazamiento. Se entrega en empaque desarmado. Dimensiones: 40x42x62 cm.",
        marca: "MBK STUDIO",
        precio: 0.00,
        stock: 10,
        estado: 'activo',
        imagen_url: ''
    },
    {
        nombre: "Mesa de Juntas 240 Zadar Roble",
        descripcion: "Mesa de juntas fabricada en tablero aglomerado grado E1 con acabado en melamina. Cuenta con caja pasacables multifuncional en color negro para facilitar la organización del cableado. Su estructura incorpora patas metálicas tipo \"U\" en acero de 60 x 30 mm, con pintura electrostática en polvo y espesor de pared de 1.5 mm. Incluye panel central metálico de soporte bajo cubierta, con perforaciones para contactos tipo 86. Dimensiones: 240x120x75 cm.",
        marca: "MBK STUDIO",
        precio: 0.00,
        stock: 10,
        estado: 'activo',
        imagen_url: ''
    },
    {
        nombre: "Estación 2 personas Cazza C/Cajones Blanco",
        descripcion: "Estación de trabajo para dos personas fabricada en tablero aglomerado grado E1 con acabado en melamina. Cuenta con cubierta con pasacables tipo grommet para facilitar la gestión del cableado y panel divisor en tela para mayor privacidad entre usuarios. Su estructura incorpora patas metálicas tipo marco en acero de 60 x 30 mm, con pintura electrostática en polvo y espesor de pared de 1.5 mm. Incluye pedestales fijos con cajones y gabinetes con cerradura, jaladeras de aluminio en color negro y bisagras de cierre suave. Dimensiones: 120x120x75 cm.",
        marca: "MBK STUDIO",
        precio: 0.00,
        stock: 10,
        estado: 'activo',
        imagen_url: ''
    },
    {
        nombre: "Extensión estación 2 personas Cazza Blanco",
        descripcion: "Extensión de estación de trabajo para dos personas fabricada en tablero aglomerado grado E1 con acabado en melamina. Cuenta con cubierta con pasacables tipo grommet para facilitar la gestión del cableado y panel divisor en tela para mayor privacidad entre usuarios. Su estructura incorpora patas metálicas tipo marco en acero de 60 x 30 mm, con pintura electrostática en polvo y espesor de pared de 1.5 mm. Incluye pedestales fijos con cajones y gabinetes con cerradura, jaladeras de aluminio en color negro y bisagras de cierre suave. Dimensiones: 120x120x75 cm.",
        marca: "MBK STUDIO",
        precio: 0.00,
        stock: 10,
        estado: 'activo',
        imagen_url: ''
    },
    {
        nombre: "Estación de 2 personas Roble Cazza",
        descripcion: "Línea Cazza. Estación de trabajo para dos personas fabricada en tablero aglomerado grado E1 con acabado en melamina. Cuenta con cubierta con pasacables tipo grommet para facilitar la gestión del cableado y panel divisor en tela para mayor privacidad entre usuarios. Su estructura incorpora patas metálicas tipo marco en acero de 60 x 30 mm, con pintura electrostática en polvo y espesor de pared de 1.5 mm. Incluye pedestales fijos con cajones y gabinetes con cerradura, jaladeras de aluminio en color negro y bisagras de cierre suave. Dimensiones: 120x120x75 cm.",
        marca: "MBK STUDIO",
        precio: 0.00,
        stock: 10,
        estado: 'activo',
        imagen_url: ''
    },
    {
        nombre: "Extensión estación 2 personas roble Cazza",
        descripcion: "Línea Cazza. Extensión de estación de trabajo para dos personas fabricada en tablero aglomerado grado E1 con acabado en melamina. Cuenta con cubierta con pasacables tipo grommet para facilitar la gestión del cableado y panel divisor en tela para mayor privacidad entre usuarios. Su estructura incorpora patas metálicas tipo marco en acero de 60 x 30 mm, con pintura electrostática en polvo y espesor de pared de 1.5 mm. Incluye pedestales fijos con cajones y gabinetes con cerradura, jaladeras de aluminio en color negro y bisagras de cierre suave. Dimensiones: 120x120x75 cm.",
        marca: "MBK STUDIO",
        precio: 0.00,
        stock: 10,
        estado: 'activo',
        imagen_url: ''
    },
    {
        nombre: "Escritorio ejecutivo 120 Cazza",
        descripcion: "Línea Cazza. Escritorio ejecutivo fabricado en tablero aglomerado grado E1 con acabado en melamina. Cuenta con cubierta con pasacables tipo grommet para facilitar la gestión del cableado. Su estructura incorpora patas metálicas tipo \"U\" en acero de 60 x 30 mm, con pintura electrostática en polvo y espesor de pared de 1.5 mm. Incluye pedestales fijos con cajones y gabinetes con cerradura, jaladeras de aluminio en color negro y bisagras de cierre suave. Dimensiones: 120x120x75 cm.",
        marca: "MBK STUDIO",
        precio: 0.00,
        stock: 10,
        estado: 'activo',
        imagen_url: ''
    },
    {
        nombre: "Escritorio ejecutivo 160 Cazza",
        descripcion: "Línea Cazza. Escritorio ejecutivo fabricado en tablero aglomerado grado E1 con acabado melamínico. Cuenta con cubierta pasacables abatible para facilitar la gestión del cableado. Su estructura incorpora patas metálicas tipo marco en acero de 60 x 30 mm, con pintura electrostática en polvo y espesor de pared de 1.5 mm. Dimensiones: 120x120x75 cm.",
        marca: "MBK STUDIO",
        precio: 0.00,
        stock: 10,
        estado: 'activo',
        imagen_url: ''
    },
    {
        nombre: "Escritorio Ejecutivo Cazza 120 C/Cajones Roble",
        descripcion: "Línea Cazza. Escritorio ejecutivo fabricado en tablero aglomerado grado E1 con acabado en melamina. Cuenta con cubierta pasacables abatible para facilitar la gestión del cableado. Su estructura incorpora patas metálicas tipo marco en acero de 60 x 30 mm, con pintura electrostática en polvo y espesor de pared de 1.5 mm. Dimensiones: 120x60x75 cm.",
        marca: "MBK STUDIO",
        precio: 0.00,
        stock: 10,
        estado: 'activo',
        imagen_url: ''
    },
    {
        nombre: "Escritorio Ejecutivo Cazza 160 C/Cajones Roble",
        descripcion: "Línea Cazza. Escritorio ejecutivo fabricado en tablero aglomerado grado E1 con acabado en melamina. Cuenta con cubierta pasacables abatible para facilitar la gestión del cableado. Su estructura incorpora patas metálicas tipo marco en acero de 60 x 30 mm, con pintura electrostática en polvo y espesor de pared de 1.5 mm. Dimensiones: 160x70x75 cm.",
        marca: "MBK STUDIO",
        precio: 0.00,
        stock: 10,
        estado: 'activo',
        imagen_url: ''
    },
    {
        nombre: "Mesa de juntas Cazza 240 Blanco/Roble",
        descripcion: "Línea Cazza. Mesa de juntas fabricada en tablero aglomerado grado E1 con acabado en melamina. Cuenta con cubierta de 25 mm de espesor y tapa pasacables para facilitar la organización del cableado. Su estructura incorpora patas metálicas inclinadas con acabado en pintura electrostática en polvo, aportando estabilidad y diseño funcional para salas de juntas, oficinas privadas o espacios colaborativos. Dimensiones: 240x120x76 cm.",
        marca: "MBK STUDIO",
        precio: 0.00,
        stock: 10,
        estado: 'activo',
        imagen_url: ''
    },
    {
        nombre: "Mesa de juntas Cazza 180 Blanco/Roble",
        descripcion: "Línea Cazza. Mesa de juntas fabricada en tablero aglomerado grado E1 con acabado en melamina. Cuenta con cubierta de 25 mm de espesor y tapa pasacables para facilitar la organización del cableado. Su estructura incorpora patas metálicas inclinadas con acabado en pintura electrostática en polvo, aportando estabilidad y diseño funcional para salas de juntas, oficinas privadas o espacios colaborativos. Dimensiones: 180x120x76 cm.",
        marca: "MBK STUDIO",
        precio: 0.00,
        stock: 10,
        estado: 'activo',
        imagen_url: ''
    },
    {
        nombre: "Mesa de Juntas Cazza 110 Blanco/Nogal/Roble",
        descripcion: "Línea Cazza. Mesa de juntas redonda fabricada en tablero aglomerado grado E1 con acabado en melamina. Cuenta con cubierta y paneles de soporte de 25 mm de espesor, brindando estabilidad estructural y resistencia para uso en salas de juntas, oficinas privadas o espacios colaborativos. Dimensiones: Φ110x75 cm.",
        marca: "MBK STUDIO",
        precio: 0.00,
        stock: 10,
        estado: 'activo',
        imagen_url: ''
    }
];

async function run() {
    try {
        console.log("Revisando categoría 'Mobiliario Corporativo'...");
        let categoryId = null;
        const categories = await Category.findAll();
        const existingCat = categories.find(c => c.nombre.toLowerCase() === 'mobiliario corporativo');

        if (existingCat) {
            categoryId = existingCat.id;
            console.log("Categoría encontrada: ID", categoryId);
        } else {
            categoryId = await Category.create({ nombre: 'Mobiliario Corporativo', descripcion: 'Mobiliario para oficinas y corporativos.' });
            console.log("Categoría creada: ID", categoryId);
        }

        console.log("Insertando productos...");
        for (const prod of productsToInsert) {
            prod.categoria_id = categoryId;
            const newId = await Product.create(prod);
            console.log(`Producto insertado: ${prod.nombre} (ID: ${newId})`);
        }

        console.log("¡Todos los productos han sido insertados exitosamente!");
    } catch (err) {
        console.error("Error importando productos:", err);
    } finally {
        process.exit();
    }
}

run();
