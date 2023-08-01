package com.oppas.scheduler;

import com.oppas.batch.PolicyJobConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.JobParametersInvalidException;
import org.springframework.batch.core.explore.JobExplorer;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.batch.core.repository.JobExecutionAlreadyRunningException;
import org.springframework.batch.core.repository.JobInstanceAlreadyCompleteException;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PolicyScheduler {

    private final JobLauncher jobLauncher;
    private final JobExplorer jobExplorer;
    private final PolicyJobConfig policyJobConfig;

    @Scheduled(cron = "0 0 9 * * ?")
    public void runPolicyUpdateJob() {
        try {
            int maxPageIndex = 43;
            for (long pageIndex = 1; pageIndex <= maxPageIndex; pageIndex++) {
                jobLauncher.run(policyJobConfig.policyUpdateJob(), new JobParametersBuilder(jobExplorer)
                        .getNextJobParameters(policyJobConfig.policyUpdateJob())
                        .addLong("pageIndex", pageIndex)
                        .toJobParameters());
            }
        } catch (JobExecutionAlreadyRunningException | JobInstanceAlreadyCompleteException
                 | JobParametersInvalidException | org.springframework.batch.core.repository.JobRestartException e) {
            e.printStackTrace();
        }
    }

}
