import { FilterQuery, HydratedDocument, UpdateQuery } from "mongoose"

export interface Write<T> {
  create: (item: T) => Promise<HydratedDocument<T>>
  update: (
    cond: FilterQuery<T>,
    item: UpdateQuery<T>
  ) => Promise<HydratedDocument<T> | null>
  delete: (id: string) => Promise<boolean | null>
}
