import { TextWidget } from "./model/TextWidget";
import { TextWidgetEntity } from "./orm/TextWidgetEntity";
import { WidgetEntity } from "./orm/WidgetEntity";
import { ImageWidget } from "./model/ImageWidget";
import { ImageWidgetEntity } from "./orm/ImageWidgetEntity";
import { Widget } from "./model/Widget";

// TODO Refactor to avoid code duplication
export class ModelConverter {

    public toTextWidgetEntity = ( widget: TextWidget ): TextWidgetEntity => {

        // We build the entity as literal otherwise Sequelize doesn't persist the attribute values
        return {

            text: widget.text,
            widget: {

                name: widget.name,
                type: widget.type,
                x: widget.x,
                y: widget.y,
                z: widget.z,
                width: widget.width,
                height: widget.height,
                selected: widget.selected,
                start: widget.start,
                end: widget.end,
                visible: widget.visible,
                locked: widget.locked
            } as WidgetEntity
        } as TextWidgetEntity
    }

    public toImageWidgetEntity = ( widget: ImageWidget ): ImageWidgetEntity => {

        // We build the entity as literal otherwise Sequelize doesn't persist the attribute values
        return {

            src: widget.src,
            widget: {

                name: widget.name,
                type: widget.type,
                x: widget.x,
                y: widget.y,
                z: widget.z,
                width: widget.width,
                height: widget.height,
                selected: widget.selected,
                start: widget.start,
                end: widget.end,
                visible: widget.visible,
                locked: widget.locked
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

        var widget = new TextWidget ();
        widget.id       = entity.id;
        widget.name     = entity.widget.name;
        widget.type     = entity.widget.type;
        widget.x        = entity.widget.x;
        widget.y        = entity.widget.y
        widget.z        = entity.widget.z;
        widget.width    = entity.widget.width;
        widget.height   = entity.widget.height;
        widget.selected = entity.widget.selected;
        widget.start    = entity.widget.start;
        widget.end      = entity.widget.end;
        widget.visible  = entity.widget.visible;
        widget.locked   = entity.widget.locked;
        widget.text     = entity.text;

        return widget;
    }

    public toImageWidget = ( entity: ImageWidgetEntity ): ImageWidget => {

        var widget = new ImageWidget ();
        widget.id       = entity.id;
        widget.name     = entity.widget.name;
        widget.type     = entity.widget.type;
        widget.x        = entity.widget.x;
        widget.y        = entity.widget.y
        widget.z        = entity.widget.z;
        widget.width    = entity.widget.width;
        widget.height   = entity.widget.height;
        widget.selected = entity.widget.selected;
        widget.start    = entity.widget.start;
        widget.end      = entity.widget.end;
        widget.visible  = entity.widget.visible;
        widget.locked   = entity.widget.locked;
        widget.src      = entity.src;

        return widget;
    }

    public toTextWidgets = ( entities: TextWidgetEntity [] ): TextWidget [] => {

        return entities
            .map ( textWidget => this.toTextWidget ( textWidget ) );
    }

    public toImageWidgets = ( entities: ImageWidgetEntity [] ): ImageWidget [] => {

        return entities
            .map ( imageWidget => this.toImageWidget ( imageWidget ) );
    }

    public toWidget = ( entity: WidgetEntity ): Widget => {

        var widget = new Widget ();
        widget.id       = entity.id;
        widget.name     = entity.name;
        widget.type     = entity.type;
        widget.x        = entity.x;
        widget.y        = entity.y;
        widget.z        = entity.z;
        widget.width    = entity.width;
        widget.height   = entity.height;
        widget.selected = entity.selected;
        widget.start    = entity.start;
        widget.end      = entity.end;
        widget.visible  = entity.visible;
        widget.locked   = entity.locked;

        return widget;
    }

    public toWidgets = ( entities: WidgetEntity [] ): Widget [] => {

        return entities
            .map ( widget => this.toWidget ( widget ) );
    }
}