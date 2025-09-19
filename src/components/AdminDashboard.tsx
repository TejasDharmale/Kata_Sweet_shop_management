import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Package, TrendingUp, Users, DollarSign } from "lucide-react";
import { Sweet } from "@/data/mockSweets";

interface AdminDashboardProps {
  sweets: Sweet[];
  onAddSweet: (sweet: Omit<Sweet, 'id' | 'created_at' | 'updated_at'>) => void;
  onUpdateSweet: (sweet: Sweet) => void;
  onDeleteSweet: (sweetId: string) => void;
  onRestock: (sweetId: string, quantity: number) => void;
}

export function AdminDashboard({ 
  sweets, 
  onAddSweet, 
  onUpdateSweet, 
  onDeleteSweet, 
  onRestock 
}: AdminDashboardProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSweet, setEditingSweet] = useState<Sweet | null>(null);
  const [newSweet, setNewSweet] = useState({
    name: '',
    category: '',
    price: 0,
    quantity: 0,
    description: '',
    image: ''
  });
  const [restockQuantity, setRestockQuantity] = useState<Record<string, number>>({});

  const categories = ['Chocolate', 'Candy', 'Gummy', 'Lollipop', 'Cookie', 'Cake'];
  
  const totalValue = sweets.reduce((sum, sweet) => sum + (sweet.price * sweet.quantity), 0);
  const totalProducts = sweets.length;
  const lowStockItems = sweets.filter(sweet => sweet.quantity < 10).length;
  const outOfStockItems = sweets.filter(sweet => sweet.quantity === 0).length;

  const handleAddSweet = () => {
    if (newSweet.name && newSweet.category && newSweet.price > 0) {
      onAddSweet(newSweet);
      setNewSweet({ name: '', category: '', price: 0, quantity: 0, description: '', image: '' });
      setIsAddModalOpen(false);
    }
  };

  const handleUpdateSweet = () => {
    if (editingSweet) {
      onUpdateSweet(editingSweet);
      setEditingSweet(null);
    }
  };

  const handleRestock = (sweetId: string) => {
    const quantity = restockQuantity[sweetId] || 0;
    if (quantity > 0) {
      onRestock(sweetId, quantity);
      setRestockQuantity({ ...restockQuantity, [sweetId]: 0 });
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Products</p>
                <p className="text-2xl font-bold">{totalProducts}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-8 w-8 text-success" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Inventory Value</p>
                <p className="text-2xl font-bold">${totalValue.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-amber-500" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Low Stock</p>
                <p className="text-2xl font-bold text-amber-600">{lowStockItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-destructive" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Out of Stock</p>
                <p className="text-2xl font-bold text-destructive">{outOfStockItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Inventory Management</h2>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button variant="candy">
              <Plus className="h-4 w-4 mr-2" />
              Add New Sweet
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Sweet</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newSweet.name}
                  onChange={(e) => setNewSweet({ ...newSweet, name: e.target.value })}
                  placeholder="Sweet name"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={newSweet.category} onValueChange={(value) => setNewSweet({ ...newSweet, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={newSweet.price}
                    onChange={(e) => setNewSweet({ ...newSweet, price: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={newSweet.quantity}
                    onChange={(e) => setNewSweet({ ...newSweet, quantity: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newSweet.description}
                  onChange={(e) => setNewSweet({ ...newSweet, description: e.target.value })}
                  placeholder="Sweet description"
                />
              </div>
              <div>
                <Label htmlFor="image">Emoji/Image</Label>
                <Input
                  id="image"
                  value={newSweet.image}
                  onChange={(e) => setNewSweet({ ...newSweet, image: e.target.value })}
                  placeholder="🍬"
                />
              </div>
              <Button onClick={handleAddSweet} variant="candy" className="w-full">
                Add Sweet
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Current Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sweets.map((sweet) => (
              <div key={sweet.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{sweet.image || '🍬'}</div>
                  <div>
                    <h4 className="font-semibold">{sweet.name}</h4>
                    <p className="text-sm text-muted-foreground">{sweet.category} • ${sweet.price}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Stock</p>
                    <p className={`font-semibold ${sweet.quantity < 10 ? 'text-amber-600' : sweet.quantity === 0 ? 'text-destructive' : 'text-foreground'}`}>
                      {sweet.quantity}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      placeholder="Qty"
                      className="w-20"
                      value={restockQuantity[sweet.id] || ''}
                      onChange={(e) => setRestockQuantity({ 
                        ...restockQuantity, 
                        [sweet.id]: parseInt(e.target.value) || 0 
                      })}
                    />
                    <Button 
                      size="sm" 
                      variant="secondary"
                      onClick={() => handleRestock(sweet.id)}
                    >
                      Restock
                    </Button>
                  </div>
                  
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setEditingSweet(sweet)}
                  >
                    Edit
                  </Button>
                  
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => onDeleteSweet(sweet.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      {editingSweet && (
        <Dialog open={true} onOpenChange={() => setEditingSweet(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Sweet</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={editingSweet.name}
                  onChange={(e) => setEditingSweet({ ...editingSweet, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-category">Category</Label>
                <Select 
                  value={editingSweet.category} 
                  onValueChange={(value) => setEditingSweet({ ...editingSweet, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-price">Price ($)</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    step="0.01"
                    value={editingSweet.price}
                    onChange={(e) => setEditingSweet({ ...editingSweet, price: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-quantity">Quantity</Label>
                  <Input
                    id="edit-quantity"
                    type="number"
                    value={editingSweet.quantity}
                    onChange={(e) => setEditingSweet({ ...editingSweet, quantity: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
              <Button onClick={handleUpdateSweet} variant="candy" className="w-full">
                Update Sweet
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}