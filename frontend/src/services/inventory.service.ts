import { InventoryModel } from '@/models/inventory.model'
import BaseDataService from './base-data.service'

export class InventoryService extends BaseDataService {
  postInventory(inventory: InventoryModel) {
    return this.post('inventory/create', inventory, InventoryModel)
  }
  getInventoryList(queryPayload: any) {
    return this.post('inventory/list', queryPayload, InventoryModel)
  }
}

const service = new InventoryService()
export default service
