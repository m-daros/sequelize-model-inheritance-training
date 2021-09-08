import { TextWidget } from "./model/TextWidget";
import { ImageWidget } from "./model/ImageWidget";
import { ModelConverter } from "./ModelConverter";
import { TextWidgetEntity } from "./orm/TextWidgetEntity";
import { ImageWidgetEntity } from "./orm/ImageWidgetEntity";
import { Sequelize } from "sequelize-typescript";
import { WidgetEntity } from "./orm/WidgetEntity";

const modelConverter = new ModelConverter ();

const sequelize = new Sequelize ( "my_db", "my_db_user", "my_db_pwd", {

    host: "localhost",
    dialect: "mysql",

    pool: {

        min: 1,
        max: 10,
        acquire: 30000,
        idle: 10000
    }
} );

sequelize.addModels ( [ WidgetEntity, TextWidgetEntity, ImageWidgetEntity ] )

const usePersistence = async () => {

    const textWidget1 = new TextWidget ();
    textWidget1.name = "my-text-widget-1";
    textWidget1.type = "text-widget";
    textWidget1.text = "my-text-1";
    textWidget1.x = 10;
    textWidget1.y = 20;

    const imageWidget1 = new ImageWidget ();
    imageWidget1.name = "my-image-widget-1";
    imageWidget1.type = "image-widget";
    imageWidget1.src = "http://my-images/image-1";
    imageWidget1.x = 5;
    imageWidget1.y = 55;

    const textWidgetEntity1 = modelConverter.toTextWidgetEntity ( textWidget1 );
    const imageWidgetEntity1 = modelConverter.toImageWidgetEntity ( imageWidget1 );

    // Persisting some widgets
    await TextWidgetEntity.create ( textWidgetEntity1, {

        include: [ { model: WidgetEntity } ]
    } );

    await ImageWidgetEntity.create ( imageWidgetEntity1, {

        include: [ { model: WidgetEntity } ]
    } );

    // Retrieving the all the widget attributes based on their types
    const textWidgetsEntities = await TextWidgetEntity.findAll ( { include: [ { model: WidgetEntity } ] } );
    const imageWidgetEntities = await ImageWidgetEntity.findAll ( { include: [ { model: WidgetEntity } ] } );

    console.log ( `Text Widgets: ${JSON.stringify ( modelConverter.toTextWidgets ( textWidgetsEntities ) )}`);
    console.log ( `Image Widgets: ${JSON.stringify ( modelConverter.toImageWidgets ( imageWidgetEntities ) )}`);

    // Retrieving only the common attributes of the widgets (we are able to retrieve them regardless of the concrete widget type)
    const widgets = await WidgetEntity.findAll ();

    console.log ( `Widgets: ${JSON.stringify ( modelConverter.toWidgets ( widgets ) )}` );
}

sequelize.sync ( { force: true } )
    .then ( ( result ) => {

        usePersistence ();
    } )
    .catch ( error => {

        console.error ( `Unable to create entities due to: ${error}` );
    } );