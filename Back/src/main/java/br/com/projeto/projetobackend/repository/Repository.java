package br.com.projeto.projetobackend.repository;

import br.com.projeto.projetobackend.modelo.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Repository extends JpaRepository<Cliente, Long> {
}
