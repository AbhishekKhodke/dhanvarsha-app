
'use client';

import { useState, useEffect } from 'react';
import { Settings, X } from 'lucide-react';
import type { MarketIndex } from '@/ai/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';


interface TradePanelProps {
  stock: MarketIndex;
  action: 'BUY' | 'SELL';
  onClose: () => void;
}

export function TradePanel({ stock, action, onClose }: TradePanelProps) {
  const [activeTab, setActiveTab] = useState(action);
  const [tradeType, setTradeType] = useState('delivery');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState<number | string>('');
  const [priceType, setPriceType] = useState('market');
  const [approxRequired, setApproxRequired] = useState(0);
  const [balance, setBalance] = useState<number>(0);
  const { toast } = useToast();

  const stockPrice = parseFloat(stock.value.replace(/,/g, ''));

  useEffect(() => {
    if (typeof window !== 'undefined') {
        const storedBalance = localStorage.getItem('userBalance') || '0';
        setBalance(parseFloat(storedBalance));
    }
  }, [])

  useEffect(() => {
    if (priceType === 'market') {
      setPrice('');
      setApproxRequired(quantity * stockPrice);
    } else {
      const limitPrice = typeof price === 'number' ? price : 0;
      setApproxRequired(quantity * limitPrice);
    }
  }, [quantity, price, priceType, stockPrice]);
  
  const handlePlaceOrder = () => {
    toast({
        title: 'Order Placed (Simulated)',
        description: `${activeTab} ${quantity} shares of ${stock.ticker} at ${priceType === 'market' ? 'market price' : `₹${price}`}.`,
    })
    onClose();
  }

  const formattedBalance = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(balance);

  const renderContent = (currentAction: 'BUY' | 'SELL') => {
    const isBuy = currentAction === 'BUY';
    
    return (
        <div className="p-1 space-y-4">
            <div className="flex justify-between items-center">
                <ToggleGroup type="single" value={tradeType} onValueChange={(value) => value && setTradeType(value)} className="space-x-1">
                    <ToggleGroupItem value="delivery" aria-label="Delivery" className="rounded-full data-[state=on]:bg-accent data-[state=on]:text-accent-foreground">Delivery</ToggleGroupItem>
                    <ToggleGroupItem value="intraday" aria-label="Intraday" className="rounded-full data-[state=on]:bg-accent data-[state=on]:text-accent-foreground">Intraday</ToggleGroupItem>
                    <ToggleGroupItem value="mtf" aria-label="MTF" className="rounded-full data-[state=on]:bg-accent data-[state=on]:text-accent-foreground">MTF</ToggleGroupItem>
                </ToggleGroup>
                <Button variant="ghost" size="icon"><Settings className="h-4 w-4" /></Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 items-end">
                <div>
                  <Label htmlFor="qty" className="text-xs text-muted-foreground">Qty</Label>
                  <Input id="qty" type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} placeholder="Qty" />
                </div>
                 <div>
                    <Label htmlFor="price" className="text-xs text-muted-foreground">Price</Label>
                    {priceType === 'market' ? (
                       <Button variant="outline" className="w-full justify-center" onClick={() => setPriceType('limit')}>At Market</Button>
                    ) : (
                       <Input id="price" type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value) || '')} placeholder="Price" />
                    )}
                </div>
            </div>

            <div className="flex justify-start">
                 <Select value={priceType} onValueChange={setPriceType}>
                    <SelectTrigger className="w-auto border-none !bg-transparent p-0 h-auto focus:ring-0">
                        <SelectValue placeholder="Price type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="market">Price Market</SelectItem>
                        <SelectItem value="limit">Price Limit</SelectItem>
                    </SelectContent>
                </Select>
            </div>


            <Separator />
            <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Balance: {formattedBalance}</span>
                <span className="text-muted-foreground">Approx req.: ₹{approxRequired.toFixed(2)}</span>
            </div>
            <Button 
                onClick={handlePlaceOrder}
                className={cn(
                    'w-full', 
                    isBuy ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'
                )}
            >
                {currentAction}
            </Button>
        </div>
    )
  }

  return (
    <Card>
      <CardContent className="p-2">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'BUY' | 'SELL')}>
          <div className="flex items-center justify-between">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="BUY">BUY</TabsTrigger>
              <TabsTrigger value="SELL">SELL</TabsTrigger>
            </TabsList>
            <Button variant="ghost" size="icon" className="ml-2" onClick={onClose}>
                <X className="h-4 w-4" />
            </Button>
          </div>
          <TabsContent value="BUY">
            {renderContent('BUY')}
          </TabsContent>
          <TabsContent value="SELL">
            {renderContent('SELL')}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
