import { TextWidget } from "./model/TextWidget";
import { TextWidgetEntity } from "./orm/TextWidgetEntity";
import { WidgetEntity } from "./orm/WidgetEntity";
import { ImageWidget } from "./model/ImageWidget";
import { ImageWidgetEntity } from "./orm/ImageWidgetEntity";

export class ModelConverter {

    public toTextWidgetEntity = ( textWidget: TextWidget ): TextWidgetEntity => {

        // We build the entity as literal otherwise Sequelize doesn't persist the attribute values
        return {

            text: textWidget.text,
            widget: {

                name: textWidget.name,
                type: textWidget.type,
                x: textWidget.x,
                y: textWidget.y
            } as WidgetEntity
        } as TextWidgetEntity
    }

    public toImageWidgetEntity = ( imageWidget: ImageWidget ): ImageWidgetEntity => {

        // We build the entity as literal otherwise Sequelize doesn't persist the attribute values
        return {

            src: imageWidget.src,
            widget: {

                name: imageWidget.name,
                type: imageWidget.type,
                x: imageWidget.x,
                y: imageWidget.y
            } as WidgetEntity
        } as ImageWidgetEntity
    }

    public toTextWidgetEntities = ( textWidgets: TextWidget [] ): TextWidgetEntity [] => {

        return textWidgets
            .map ( textWidget => this.toTextWidgetEntity ( textWidget ) );
    }

    public toImageWidgetEntities = ( imageWidgets: ImageWidget [] ): ImageWidgetEntity [] => {

        return imageWidgets
            .map ( imageWidget => this.toImageWidgetEntity ( imageWidget ) );
    }

    public toTextWidget = ( entity: TextWidgetEntity ): TextWidget => {

        var textWidget = new TextWidget ();
        textWidget.id   = entity.id;
        textWidget.name = entity.widget.name;
        textWidget.type = entity.widget.type;
        textWidget.x    = entity.widget.x;
        textWidget.y    = entity.widget.y
        textWidget.text = entity.text;

        return textWidget;
    }

    public toImageWidget = ( entity: ImageWidgetEntity ): ImageWidget => {

        var imageWidget = new ImageWidget ();
        imageWidget.id   = entity.id;
        imageWidget.name = entity.widget.name;
        imageWidget.type = entity.widget.type;
        imageWidget.x    = entity.widget.x;
        imageWidget.y    = entity.widget.y
        imageWidget.src  = entity.src;

        return imageWidget;
    }

    public toTextWidgets = ( entities: TextWidgetEntity [] ): TextWidget [] => {

        return entities
            .map ( textWidget => this.toTextWidget ( textWidget ) );
    }

    public toImageWidgets = ( entities: ImageWidgetEntity [] ): ImageWidget [] => {

        return entities
            .map ( imageWidget => this.toImageWidget ( imageWidget ) );
    }
}