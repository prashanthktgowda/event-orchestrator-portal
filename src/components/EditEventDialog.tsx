
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CateringEvent } from "@/data/mock-events";
import { format } from "date-fns";

interface EditEventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  event: CateringEvent;
  onUpdateEvent: (event: CateringEvent) => void;
}

const EditEventDialog = ({ isOpen, onClose, event, onUpdateEvent }: EditEventDialogProps) => {
  const [formData, setFormData] = useState({
    clientName: "",
    eventTime: "",
    deliveryAddress: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      coordinates: { lat: 0, lng: 0 }
    },
    notes: ""
  });

  useEffect(() => {
    if (event) {
      setFormData({
        clientName: event.clientName,
        eventTime: format(new Date(event.eventTime), "yyyy-MM-dd'T'HH:mm"),
        deliveryAddress: {
          ...event.deliveryAddress,
          coordinates: event.deliveryAddress.coordinates || { lat: 0, lng: 0 }
        },
        notes: event.notes || ""
      });
    }
  }, [event, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      if (parent === "deliveryAddress") {
        setFormData({
          ...formData,
          deliveryAddress: {
            ...formData.deliveryAddress,
            [child]: value,
          },
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedEvent: CateringEvent = {
      ...event,
      clientName: formData.clientName,
      eventTime: new Date(formData.eventTime).toISOString(),
      deliveryAddress: formData.deliveryAddress,
      notes: formData.notes,
    };
    
    onUpdateEvent(updatedEvent);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
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
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <Input
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Update Event</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditEventDialog;
