import { Table, Column, Model, BelongsTo, PrimaryKey, AutoIncrement, AllowNull } from "sequelize-typescript";
import { WidgetEntity } from "./WidgetEntity";

@Table
export class TextWidgetEntity extends Model<TextWidgetEntity> {

    @PrimaryKey
    @AutoIncrement
    @AllowNull ( false )
    @Column
    id: number;

    @BelongsTo ( () => WidgetEntity, "widgetId" )
    widget: WidgetEntity;

    @Column
    text: string;
}