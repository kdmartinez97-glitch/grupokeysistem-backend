const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const dcmCategories = [
    {
        name: "Productos para Oficina",
        sub: [
            { name: "Papelería", sub: [] },
            { name: "Cuadernos y Blocks", sub: [] },
            {
                name: "Escritura",
                sub: [
                    "Bolígrafo",
                    "Bolígrafo tipo fuente",
                    "Bolígrafo Roller",
                    "Repuestos de bolígrafos",
                    "Lápiz de madera",
                    "Lapicero",
                    "Lápices de color",
                    "Puntillas",
                    "Crayolas y marcadores de cera",
                    "Marcadores y marcatextos",
                    "Plumones",
                    "Correctores",
                    "Gises",
                    "Repuestos de marcadores"
                ]
            },
            { name: "Encuadernado y Engargolado", sub: [] },
            { name: "Accesorios de Escritorio", sub: [] },
            { name: "Clasificación y Organización", sub: [] },
            { name: "Adhesivos", sub: [] },
            { name: "Recorte", sub: [] },
            { name: "Geometría", sub: [] },
            { name: "Formatos", sub: [] },
            { name: "Destructoras", sub: [] },
            { name: "Sellos y Tintas", sub: [] },
            { name: "Pizarrones y Rotafolios", sub: [] },
            { name: "Cintas, Etiquetas y Rotuladores", sub: [] }
        ]
    },
    { 
        name: "Papel", 
        sub: [
            {
                name: "Papel Cortado",
                sub: ["Carta", "Oficio", "Doble Carta"]
            },
            {
                name: "Rollos",
                sub: ["Plotter", "Calculadora", "Punto de Venta"]
            },
            {
                name: "Especialidades",
                sub: ["Fotográfico", "Transfer", "Opalina"]
            }
        ] 
    },
    { 
        name: "Tintas y Toners", 
        sub: [
            {
                name: "Originales",
                sub: ["HP", "Epson", "Canon", "Brother"]
            },
            {
                name: "Compatibles",
                sub: ["Tintas Genéricas", "Toners Genéricos"]
            }
        ] 
    },
    { 
        name: "Tecnología", 
        sub: [
            {
                name: "Computadoras",
                sub: ["Laptops", "Desktops", "All-in-One"]
            },
            {
                name: "Impresoras y Escáneres",
                sub: ["Multifuncionales", "Láser", "Inyección de Tinta"]
            },
            {
                name: "Almacenamiento",
                sub: ["Discos Duros Externos", "Memorias USB", "Unidades SSD"]
            },
            {
                name: "Redes",
                sub: ["Routers", "Switches", "Cables de Red"]
            }
        ] 
    },
    { 
        name: "Accesorios", 
        sub: [
            {
                name: "Periféricos",
                sub: ["Teclados", "Mouses", "Kits de Teclado y Mouse"]
            },
            {
                name: "Audio",
                sub: ["Audífonos", "Bocinas", "Micrófonos"]
            },
            {
                name: "Cables y Adaptadores",
                sub: ["HDMI", "USB", "VGA"]
            }
        ] 
    },
    { 
        name: "Muebles", 
        sub: [
            {
                name: "Sillas",
                sub: ["Ejecutivas", "Operativas", "Visita"]
            },
            {
                name: "Escritorios",
                sub: ["Ejecutivos", "Operativos", "Recepciones"]
            },
            {
                name: "Archiveros",
                sub: ["Metálicos", "Madera"]
            }
        ] 
    },
    { 
        name: "Limpieza", 
        sub: [
            {
                name: "Químicos",
                sub: ["Detergentes", "Cloro", "Desinfectantes", "Limpiavidrios"]
            },
            {
                name: "Bolsas y Cestos",
                sub: ["Bolsas de Basura", "Cestos de Basura", "Contenedores"]
            },
            {
                name: "Utensilios",
                sub: ["Escobas", "Trapeadores", "Jergas", "Fibras y Esponjas"]
            },
            {
                name: "Higiene Personal",
                sub: ["Papel Higiénico", "Jabón para Manos", "Toallas de Papel"]
            }
        ] 
    }
];

const seedData = async () => {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    try {
        console.log("Desactivando constraints de foreign key...");
        await connection.execute('SET FOREIGN_KEY_CHECKS = 0;');

        console.log("Alterando tabla categorias para soportar parent_id...");
        try {
            await connection.execute('ALTER TABLE categorias ADD COLUMN parent_id INT NULL');
            await connection.execute('ALTER TABLE categorias ADD CONSTRAINT fk_parent FOREIGN KEY (parent_id) REFERENCES categorias(id) ON DELETE CASCADE');
            console.log("Columna parent_id agregada con éxito.");
        } catch (err) {
            console.log("Nota: La columna parent_id probablemente ya existe.");
        }

        console.log("Vaciando tablas de productos y categorias...");
        await connection.execute('TRUNCATE TABLE productos');
        await connection.execute('TRUNCATE TABLE categorias');

        console.log("Insertando categorías de Nivel 1, 2 y 3 exhaustivamente...");
        
        let leafCategoryIds = [];

        for (const cat1 of dcmCategories) {
            const [res1] = await connection.execute('INSERT INTO categorias (nombre) VALUES (?)', [cat1.name]);
            const id1 = res1.insertId;
            
            if (cat1.sub && cat1.sub.length > 0) {
                for (const cat2 of cat1.sub) {
                    const [res2] = await connection.execute('INSERT INTO categorias (nombre, parent_id) VALUES (?, ?)', [cat2.name, id1]);
                    const id2 = res2.insertId;
                    
                    if (cat2.sub && cat2.sub.length > 0) {
                        for (const cat3 of cat2.sub) {
                            const [res3] = await connection.execute('INSERT INTO categorias (nombre, parent_id) VALUES (?, ?)', [cat3, id2]);
                            leafCategoryIds.push({ id: res3.insertId, name: cat3, level: 3 });
                        }
                    } else {
                        leafCategoryIds.push({ id: id2, name: cat2.name, level: 2 });
                    }
                }
            } else {
                leafCategoryIds.push({ id: id1, name: cat1.name, level: 1 });
            }
        }

        console.log("Insertando productos de prueba...");
        
        for (const leaf of leafCategoryIds) {
            const numProducts = Math.floor(Math.random() * 3) + 2; // 2 to 4 productos
            for (let i = 1; i <= numProducts; i++) {
                const nombre = `Producto Profesional ${leaf.name} - Variante ${i}`;
                const descripcion = `Este es un excelente producto para la categoría ${leaf.name}. Ideal para uso de oficina o corporativo. Cuenta con garantía directa de Grupo Keysistem.`;
                const precio = (Math.random() * 500 + 50).toFixed(2);
                const stock = Math.floor(Math.random() * 50);
                const marca = "DCM Pro";
                
                await connection.execute(
                    'INSERT INTO productos (nombre, descripcion, precio, stock, categoria_id, marca, estado) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [nombre, descripcion, precio, stock, leaf.id, marca, 'activo']
                );
            }
        }

        await connection.execute('SET FOREIGN_KEY_CHECKS = 1;');
        console.log("¡Base de datos sembrada exitosamente con Mega Menú y productos exhaustivos!");
        
    } catch (error) {
        console.error("Error durante el proceso:", error);
    } finally {
        await connection.end();
    }
};

seedData();
