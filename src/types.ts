import { Model, DocumentQuery } from "mongoose";
import { DocumentType } from "@typegoose/typegoose";

/**
 * The pagination options that can be passed.
 */
export interface IPaginateOptions {
    limit?: number;
    sortField?: string;
    sortAscending?: Boolean;
    next?: string;
    previous?: string;
}

/**
 * The result of the paginated find request
 */
export interface IPaginateResult<T> {
    hasNext?: boolean;
    hasPrevious?: boolean;
    next?: string;
    previous?: string;
    totalDocs: number;
    docs: T[];
}

/**
 * An extension of the mongoose Model which include the findPaged method.
 */
export interface IPaginateModel<T> extends Model<DocumentType<T>, {}> {
    findPaged(
        options: IPaginateOptions,
        query?: Object,
        projection?: Object,
        _populate?: (Object | string)[]
    ): DocumentQuery<IPaginateResult<DocumentType<T>>, DocumentType<T>>;
}

/**
 * [Typegoose only] This is a type that you can cast your Typegoose model to
 * Example: export const UserModel = new User().getModelForClass(User) as PaginateModel<User, typeof User>;
 */
export type PaginateModel<T, T2> = IPaginateModel<DocumentType<T>> & T & T2;
