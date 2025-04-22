
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CateringEvent } from "@/data/mock-events";
import { v4 as uuidv4 } from "uuid";

interface CreateEventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateEvent: (event: CateringEvent) => void;
}

const CreateEventDialog = ({ isOpen, onClose, onCreateEvent }: CreateEventDialogProps) => {
  const [formData, setFormData] = useState({
    clientName: "",
    eventTime: "",
    deliveryAddress: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      coordinates: { lat: 0, lng: 0 }
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof typeof formData],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEvent: CateringEvent = {
      id: uuidv4(),
      clientName: formData.clientName,
      eventTime: formData.eventTime || new Date().toISOString(),
      deliveryAddress: formData.deliveryAddress,
      status: "upcoming",
      items: [],
      staff: [],
      notes: "",
      specialEquipment: [],
    };
    
    onCreateEvent(newEvent);
    
    // Reset form
    setFormData({
      clientName: "",
      eventTime: "",
      deliveryAddress: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        coordinates: { lat: 0, lng: 0 }
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="clientName" className="text-right">
                Client Name
              </Label>
              <Input
                id="clientName"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="eventTime" className="text-right">
                Event Date & Time
              </Label>
              <Input
                id="eventTime"
                name="eventTime"
                type="datetime-local"
                value={formData.eventTime}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="street" className="text-right">
                Street Address
              </Label>
              <Input
                id="street"
                name="deliveryAddress.street"
                value={formData.deliveryAddress.street}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="city" className="text-right">
                City
              </Label>
              <Input
                id="city"
                name="deliveryAddress.city"
                value={formData.deliveryAddress.city}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="state" className="text-right">
                State
              </Label>
              <Input
                id="state"
                name="deliveryAddress.state"
                value={formData.deliveryAddress.state}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="zipCode" className="text-right">
                Zip Code
              </Label>
              <Input
                id="zipCode"
                name="deliveryAddress.zipCode"
                value={formData.deliveryAddress.zipCode}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create Event</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEventDialog;
