
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CateringItem, SubItem } from "@/data/mock-events";
import { v4 as uuidv4 } from "uuid";

interface AddItemDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: CateringItem) => void;
}

const AddItemDialog = ({ isOpen, onClose, onAddItem }: AddItemDialogProps) => {
  const [itemName, setItemName] = useState("");
  const [subItems, setSubItems] = useState<{ name: string; isFoodItem: boolean }[]>([
    { name: "", isFoodItem: false }
  ]);

  const handleSubItemChange = (index: number, field: string, value: string | boolean) => {
    const updatedSubItems = [...subItems];
    updatedSubItems[index] = {
      ...updatedSubItems[index],
      [field]: value
    };
    setSubItems(updatedSubItems);
  };

  const addSubItem = () => {
    setSubItems([...subItems, { name: "", isFoodItem: false }]);
  };

  const removeSubItem = (index: number) => {
    if (subItems.length > 1) {
      const updatedSubItems = subItems.filter((_, i) => i !== index);
      setSubItems(updatedSubItems);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty sub-items
    const validSubItems = subItems.filter(item => item.name.trim() !== "");
    
    if (!itemName.trim() || validSubItems.length === 0) {
      return;
    }
    
    const newItem: CateringItem = {
      id: uuidv4(),
      name: itemName,
      status: "pending",
      subItems: validSubItems.map(item => ({
        id: uuidv4(),
        name: item.name,
        status: "pending",
        isFoodItem: item.isFoodItem
      }))
    };
    
    onAddItem(newItem);
    
    // Reset form
    setItemName("");
    setSubItems([{ name: "", isFoodItem: false }]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Item to Checklist</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="itemName" className="text-right">
                Item Name
              </Label>
              <Input
                id="itemName"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="col-span-3"
                placeholder="e.g., Table Setup"
                required
              />
            </div>
            
            <div className="border-t pt-4 mt-4">
              <h4 className="font-medium mb-2">Sub-items</h4>
              
              {subItems.map((subItem, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 mb-2 items-center">
                  <Input
                    value={subItem.name}
                    onChange={(e) => handleSubItemChange(index, "name", e.target.value)}
                    className="col-span-7"
                    placeholder="e.g., Tablecloths"
                  />
                  
                  <div className="col-span-3 flex items-center gap-2">
                    <Checkbox 
                      id={`food-${index}`}
                      checked={subItem.isFoodItem}
                      onCheckedChange={(checked) => 
                        handleSubItemChange(index, "isFoodItem", checked === true)
                      }
                    />
                    <Label htmlFor={`food-${index}`} className="text-sm">
                      Food Item
                    </Label>
                  </div>
                  
                  <div className="col-span-2 flex justify-end">
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeSubItem(index)}
                      disabled={subItems.length <= 1}
                      className="h-8 w-8 p-0"
                    >
                      ✕
                    </Button>
                  </div>
                </div>
              ))}
              
              <Button 
                type="button" 
                variant="outline" 
                className="w-full mt-2" 
                onClick={addSubItem}
              >
                Add Sub-item
              </Button>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add to Checklist</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemDialog;
