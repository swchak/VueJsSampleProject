import { InventoryModel } from '@/models/inventory.model'
import { InventoryItemModel } from '@/models/inventory-item.model'
import BaseDataService from './base-data.service'

export class InventoryService extends BaseDataService {
  postInventory(inventory: InventoryModel) {
    return this.post('inventory/create', inventory, InventoryModel)
  }
  getInventoryList(queryPayload: any) {
    return this.post('inventory', queryPayload, InventoryItemModel)
  }
}

const service = new InventoryService()
export default service
