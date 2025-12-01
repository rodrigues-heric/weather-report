import { Label } from '@radix-ui/react-label'
import { Button } from './ui/button'
import { 
    Card, 
    CardAction,
    CardContent, 
    CardDescription, 
    CardFooter, 
    CardHeader, 
    CardTitle 
} from './ui/card'
import { Input } from './ui/input'

export function CardLogin() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Faça login em sua conta</CardTitle>
        <CardDescription>Insira suas credenciais para continuar</CardDescription>
        <CardAction><Button variant="link">Cadastrar</Button></CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="u@exemplo.com" required></Input>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Senha</Label>
                <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                  Esqueceu sua senha?
                </a>
              </div>
              <Input id="password" type="password" required></Input>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">Login</Button>
      </CardFooter>
    </Card>
  );
}