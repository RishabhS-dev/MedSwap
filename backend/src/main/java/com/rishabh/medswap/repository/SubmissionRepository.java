package com.rishabh.medswap.repository;

import com.rishabh.medswap.entity.Submission;
import com.rishabh.medswap.entity.User;
import com.rishabh.medswap.enums.SubmissionStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    List<Submission> findByStatus(SubmissionStatus status);
    List<Submission> findBySubmittedBy(User user);
}