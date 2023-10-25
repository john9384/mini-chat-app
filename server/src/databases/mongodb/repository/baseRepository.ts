import _ from "lodash"
import { ObjectId } from "mongodb"
import { Model, HydratedDocument, FilterQuery, UpdateQuery } from "mongoose"
import { Read, Write } from "../interface"

export class BaseRepository<T> implements Read<T>, Write<T> {
  private _model: Model<T>

  constructor(schemaModel: Model<T>) {
    this._model = schemaModel
  }

  async create(item: T): Promise<HydratedDocument<T>> {
    return await this._model.create(item)
  }

  async update(
    cond: FilterQuery<T>,
    item: UpdateQuery<T>
  ): Promise<HydratedDocument<T> | null> {
    const queryObj = this._setQueryObj(cond)
    const doc = await this._model.findOneAndUpdate(queryObj, item)
    await doc?.save()

    return this._model.findOne(queryObj)
  }

  async delete(id: string): Promise<boolean | null> {
    const queryObj = this._setQueryObj({ id })
    return this._model.findOneAndRemove(queryObj)
  }

  async findOne(
    cond?: FilterQuery<T>,
    projection?: Record<string, unknown> | string | Array<string>
  ): Promise<HydratedDocument<T> | null> {
    const queryObj = this._setQueryObj(cond)
    return this._model.findOne(queryObj, projection)
  }

  async find(
    cond?: FilterQuery<T>,
    projection?: Record<string, unknown> | string | Array<string>
  ): Promise<Array<HydratedDocument<T>>> {
    const queryObj = this._setQueryObj(cond)

    return this._model.find(queryObj, projection).sort({ createdAt: -1 })
  }

  private _omitIdFromQuery(query: FilterQuery<T>) {
    const cleanObj = _.partial(_.omit, _, ["id"])
    return cleanObj(query)
  }

  private _setQueryObj(cond?: FilterQuery<T>): FilterQuery<T> {
    if (!cond) return {}

    if (_.has(cond, "id")) {
      const _id = new ObjectId(cond.id)
      const cleanedObj = this._omitIdFromQuery(cond)

      return {
        _id,
        ...cleanedObj,
      }
    }
    return cond
  }
}
