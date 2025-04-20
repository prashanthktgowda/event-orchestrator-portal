
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface MapTokenInputProps {
  onTokenSaved: () => void;
}

const MapTokenInput = ({ onTokenSaved }: MapTokenInputProps) => {
  const [token, setToken] = useState('');
  
  const handleSave = () => {
    if (token) {
      localStorage.setItem('mapbox-token', token);
      onTokenSaved();
    }
  };
  
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Mapbox API Token</CardTitle>
        <CardDescription>
          To display event location maps, please enter your Mapbox public token.
          You can get one for free from <a href="https://mapbox.com/" target="_blank" rel="noreferrer" className="text-primary underline">mapbox.com</a>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <label htmlFor="mapbox-token" className="text-sm font-medium">
            Mapbox Public Token
          </label>
          <Input 
            id="mapbox-token"
            type="text" 
            placeholder="pk.eyJ1Ijoi..." 
            value={token} 
            onChange={(e) => setToken(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            This will be stored in your browser's local storage.
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} disabled={!token}>
          Save Token
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MapTokenInput;
