package br.com.projeto.projetobackend.controler;

import br.com.projeto.projetobackend.modelo.Cliente;
import br.com.projeto.projetobackend.repository.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class Controller {

    @Autowired
    Repository repository;

    @GetMapping("/")
    public List<Cliente> getCliente(){
        return repository.findAll();
    }

    @PostMapping("/cadastro")
    public Cliente cadastrar(@RequestBody Cliente c){
        return repository.save(c);
    }

    @PutMapping("/atualiza")
    public Cliente atualiza(@RequestBody Cliente c ){
        return repository.save(c);
    }

    //Metodo que deleta um objeto já criado de um cliente pelo id.
    @DeleteMapping("/{id}")
    public String deleta(@PathVariable Long id){
        repository.deleteById(id);
        return "Deletado com sucesso";
    }
}
