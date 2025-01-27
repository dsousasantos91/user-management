package br.com.dsousasantos91.usermanagement.repository;


import br.com.dsousasantos91.usermanagement.domain.model.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {

}
