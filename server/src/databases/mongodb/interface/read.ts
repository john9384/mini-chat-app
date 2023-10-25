import { FilterQuery, HydratedDocument } from "mongoose"

export interface Read<T> {
  findOne(
    cond?: FilterQuery<T>,
    projection?: Record<string, unknown> | string | Array<string>
  ): Promise<HydratedDocument<T> | null>

  find(
    cond?: FilterQuery<T>,
    projection?: Record<string, unknown> | string | Array<string>
  ): Promise<Array<HydratedDocument<T>>>
}
