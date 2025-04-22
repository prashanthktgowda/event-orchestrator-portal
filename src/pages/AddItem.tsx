
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Plus, Minus } from "lucide-react";

interface PricingTier {
  name: string;
  price: string;
}

export default function AddItem() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isFood, setIsFood] = useState(false);
  const [hasVariants, setHasVariants] = useState(false);
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([
    { name: "Standard", price: "" }
  ]);

  const handleAddPricingTier = () => {
    setPricingTiers([...pricingTiers, { name: "", price: "" }]);
  };

  const handleRemovePricingTier = (index: number) => {
    if (pricingTiers.length > 1) {
      setPricingTiers(pricingTiers.filter((_, i) => i !== index));
    }
  };

  const handlePricingTierChange = (index: number, field: keyof PricingTier, value: string) => {
    const updatedTiers = [...pricingTiers];
    updatedTiers[index] = {
      ...updatedTiers[index],
      [field]: value
    };
    setPricingTiers(updatedTiers);
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!itemName.trim()) {
      toast({
        title: "Validation Error",
        description: "Item name is required",
        variant: "destructive"
      });
      return;
    }

    if (!category) {
      toast({
        title: "Validation Error",
        description: "Category is required",
        variant: "destructive"
      });
      return;
    }

    // Check if at least one pricing tier has a valid price
    const hasValidPrice = pricingTiers.some(tier => 
      tier.name && parseFloat(tier.price) > 0
    );

    if (!hasValidPrice) {
      toast({
        title: "Validation Error",
        description: "At least one pricing tier with a valid price is required",
        variant: "destructive"
      });
      return;
    }

    // In a real app, save to DB here
    toast({
      title: "Item created",
      description: `${itemName} has been added to the catalog`,
    });
    
    // Navigate back to catalog
    navigate("/item-catalog");
  };

  return (
    <div className="container py-8">
      <div className="flex items-center gap-2 mb-6">
        <Button 
          variant="ghost" 
          className="gap-1"
          onClick={() => navigate("/item-catalog")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Catalog
        </Button>
        <h1 className="text-2xl font-bold">Add New Item</h1>
      </div>

      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSaveItem}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Item Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="itemName">Item Name *</Label>
                  <Input
                    id="itemName"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    placeholder="e.g. Chicken Entrée"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="equipment">Equipment</SelectItem>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="drink">Drink</SelectItem>
                      <SelectItem value="service">Service</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter item description..."
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isFood"
                  checked={isFood}
                  onCheckedChange={setIsFood}
                />
                <Label htmlFor="isFood">This is a food item</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="hasVariants"
                  checked={hasVariants}
                  onCheckedChange={setHasVariants}
                />
                <Label htmlFor="hasVariants">This item has variants or options</Label>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pricingTiers.map((tier, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-5">
                    <Label htmlFor={`tierName-${index}`} className={index === 0 ? "" : "sr-only"}>
                      {index === 0 && "Tier Name"}
                    </Label>
                    <Input
                      id={`tierName-${index}`}
                      value={tier.name}
                      onChange={(e) => 
                        handlePricingTierChange(index, "name", e.target.value)
                      }
                      placeholder="e.g. Standard, Premium"
                    />
                  </div>
                  <div className="col-span-5">
                    <Label htmlFor={`tierPrice-${index}`} className={index === 0 ? "" : "sr-only"}>
                      {index === 0 && "Price"}
                    </Label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                        $
                      </span>
                      <Input
                        id={`tierPrice-${index}`}
                        value={tier.price}
                        onChange={(e) => 
                          handlePricingTierChange(index, "price", e.target.value)
                        }
                        className="pl-6"
                        placeholder="0.00"
                        type="number"
                        step="0.01"
                        min="0"
                      />
                    </div>
                  </div>
                  <div className="col-span-2 flex justify-end">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemovePricingTier(index)}
                      disabled={pricingTiers.length === 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                  {index < pricingTiers.length - 1 && (
                    <Separator className="col-span-12 my-1" />
                  )}
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={handleAddPricingTier}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Pricing Tier
              </Button>

              {hasVariants && (
                <div className="rounded-md bg-blue-50 p-4 mt-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">Variants Configuration</h3>
                      <div className="mt-2 text-sm text-blue-700">
                        After saving this item, you'll be able to configure variants and options.
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/item-catalog")}
            >
              Cancel
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              Save Item
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
