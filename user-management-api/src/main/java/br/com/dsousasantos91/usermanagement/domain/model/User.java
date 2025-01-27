package br.com.dsousasantos91.usermanagement.domain.model;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
@EntityListeners(AuditingEntityListener.class)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String username;
    @Column(unique = true)
    private String document;
    @Column(unique = true)
    private String email;
    private String password;
    private Boolean active;
    private String address;
    private String phoneNumber;

    @ManyToOne
    private Profile profile;

    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime updatedAt;

    @PrePersist
    @PreUpdate
    private void sanitizeFields() {
        if (document != null) {
            document = document.replaceAll("[^\\d]", "");
        }
        if (phoneNumber != null) {
            phoneNumber = phoneNumber.replaceAll("[^\\d]", "");
        }
    }
}
