import { Table, Column, PrimaryKey, Model, AutoIncrement, AllowNull } from "sequelize-typescript";

@Table
export class WidgetEntity extends Model<WidgetEntity> {

    @PrimaryKey
    @AutoIncrement
    @AllowNull ( false )
    @Column
    id: number;

    @Column
    name: string;

    @Column
    type: string; // Should be WidgetType

    @Column
    x: number;

    @Column
    y: number;

    // @Column
    // z: number;
    //
    // @Column
    // width: number;
    //
    // @Column
    // height: number;
    //
    // @Column
    // selected: boolean;
    //
    // @Column
    // start: number;
    //
    // @Column
    // end: number;
    //
    // @Column
    // visible: boolean;
    //
    // @Column
    // locked: boolean;
}