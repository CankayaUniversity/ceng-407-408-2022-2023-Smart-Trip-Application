package com.sono.tt.location.repository;

import com.sono.tt.location.DynamoConfiguration;
import com.sono.tt.location.DynamoRepository;
import com.sono.tt.location.IdGenerator;
import com.sono.tt.location.model.Book;
import com.sono.tt.location.model.Facility;
import io.micronaut.core.annotation.NonNull;
import io.micronaut.core.util.CollectionUtils;
import jakarta.inject.Singleton;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Singleton // <1>
public class DefaultFacilityRepository extends DynamoRepository<Facility> implements FacilityRepository {
    private static final Logger LOG = LoggerFactory.getLogger(DefaultFacilityRepository.class);
    private static final String ATTRIBUTE_ID = "id";
    private static final String ATTRIBUTE_FACILITYNAME = "facilityName";
    private static final String ATTRIBUTE_LATITUDE = "latitude";
    private static final String ATTRIBUTE_LONGITUDE = "longitude";
    private static final String ATTRIBUTE_ISAVM = "IsAvm";
    private static final String ATTRIBUTE_USERID = "userId";
    private static final String ATTRIBUTE_TIMESTAMP = "Timestamp";
    private static final String ATTRIBUTE_ADDITIONALCOMMENT = "AdditionalComment";
    private static final String ATTRIBUTE_RATING = "rating";
    private static final String ATTRIBUTE_COMMENTS = "comments";
    private static final String ATTRIBUTE_HASTOILET = "hasToilet";
    private static final String ATTRIBUTE_HASDISABLED = "hasDisabled";
    private static final String ATTRIBUTE_BABYCARE = "hasBabycare";
    private static final String ATTRIBUTE_HASMOSQUE = "hasMosque";


    private final IdGenerator idGenerator;


    public DefaultFacilityRepository(DynamoDbClient dynamoDbClient,
                                     DynamoConfiguration dynamoConfiguration,
                                     IdGenerator idGenerator
    ) {
        super(dynamoDbClient, dynamoConfiguration);
        this.idGenerator = idGenerator;

    }

    @Override
    @NonNull
    public String save(@NonNull @NotBlank String facilityName,
                       @NonNull @NotBlank String latitude,
                       @NonNull @NotBlank String longitude,
                       @NonNull @NotBlank String isAvm,
                       @NonNull @NotBlank String userId,
                       @NonNull @NotBlank String Timestamp,
                       @NonNull @NotBlank String AdditionalComment,
                       @NonNull @NotBlank String rating,
                       @NonNull @NotBlank List<String> comments,
                       @NonNull @NotBlank String hasToilet,
                       @NonNull @NotBlank String hasDisabled,
                       @NonNull @NotBlank String hasBabycare,
                       @NonNull @NotBlank String hasMosque) {
        String id = idGenerator.generate();
        save(new Facility(id,facilityName,latitude,longitude,isAvm,userId,Timestamp,AdditionalComment,rating,comments,hasToilet,hasDisabled,hasBabycare,hasMosque));
        //return location;
        return id;
    }

    public String save(@NonNull @NotNull @Valid Facility facility) {
        PutItemResponse itemResponse = dynamoDbClient.putItem(PutItemRequest.builder()
                .tableName(dynamoConfiguration.getTableName())
                .item(item(facility))
                .build());
        if (LOG.isDebugEnabled()) {
            LOG.debug(itemResponse.toString());
        }
        return null;
    }

/*    protected void save(@NonNull @NotNull @Valid Facility facility) {
        PutItemResponse itemResponse = dynamoDbClient.putItem(PutItemRequest.builder()
                .tableName(dynamoConfiguration.getTableName())
                .item(item(facility))
                .build());
        if (LOG.isDebugEnabled()) {
            LOG.debug(itemResponse.toString());
        }
    }*/

    @Override
    @NonNull
    public Optional<Facility> findById(@NonNull @NotBlank String id) {
        return findById(Facility.class, id)
                .map(this::facilityOf);
    }

    @Override
    @NonNull
    public Optional<Facility> findById(@NonNull @NotBlank String latitude, @NonNull @NotBlank String longitude) {
        // Retrieve facilities using your preferred method (e.g., querying a database, calling an API, etc.)
        List<Facility> facilities = findAll();

        // Iterate through the facilities to find a match based on latitude and longitude
        for (Facility facility : facilities) {
            if (facility.getLatitude().equals(latitude) && facility.getLongitude().equals(longitude)) {
                return Optional.of(facility);
            }
        }

        return Optional.empty(); // Return an empty Optional if no facility matches the given latitude and longitude
    }
/*

    @Override
    public Optional<Facility> findById(String latitude, String longitude) {
        return Optional.empty();
    }
*/

    @Override
    @NonNull
    public List<Facility> findAll() {
        List<Facility> result = new ArrayList<>();
        String beforeId = null;
        do {
            QueryRequest request = findAllQueryRequest(Facility.class, beforeId, null);
            QueryResponse response = dynamoDbClient.query(request);
            if (LOG.isTraceEnabled()) {
                LOG.trace(response.toString());
            }
            result.addAll(parseInResponse(response));
            beforeId = lastEvaluatedId(response, Facility.class).orElse(null);
        } while(beforeId != null); // <2>
        return result;
    }

    private List<Facility> parseInResponse(QueryResponse response) {
        List<Map<String, AttributeValue>> items = response.items();
        List<Facility> result = new ArrayList<>();
        if (CollectionUtils.isNotEmpty(items)) {
            for (Map<String, AttributeValue> item : items) {
                result.add(facilityOf(item));
            }
        }
        return result;
    }

    @NonNull
    private Facility facilityOf(@NonNull Map<String, AttributeValue> item) {
        return new Facility(
                item.get(ATTRIBUTE_ID).s(),
                item.get(ATTRIBUTE_FACILITYNAME).s(),
                item.get(ATTRIBUTE_LATITUDE).s(),
                item.get(ATTRIBUTE_LONGITUDE).s(),
                item.get(ATTRIBUTE_ISAVM).s(),
                item.get(ATTRIBUTE_USERID).s(),
                item.get(ATTRIBUTE_TIMESTAMP).s(),
                item.get(ATTRIBUTE_ADDITIONALCOMMENT).s(),
                item.get(ATTRIBUTE_RATING).s(),
                item.get(ATTRIBUTE_COMMENTS).ns(),
                item.get(ATTRIBUTE_HASTOILET).s(),
                item.get(ATTRIBUTE_HASDISABLED).s(),
                item.get(ATTRIBUTE_BABYCARE).s(),
                item.get(ATTRIBUTE_HASMOSQUE).s()
        );
    }

    @Override
    @NonNull
    protected Map<String, AttributeValue> item(@NonNull Facility facility) {
        Map<String, AttributeValue> result = super.item(facility);
        result.put(ATTRIBUTE_ID, AttributeValue.builder().s(facility.getId()).build());
        result.put(ATTRIBUTE_FACILITYNAME, AttributeValue.builder().s(facility.getFacilityName()).build());
        result.put(ATTRIBUTE_LATITUDE, AttributeValue.builder().s(facility.getLatitude()).build());
        result.put(ATTRIBUTE_LONGITUDE, AttributeValue.builder().s(facility.getLongitude()).build());
        result.put(ATTRIBUTE_ISAVM, AttributeValue.builder().s(facility.getIsAvm()).build());
        result.put(ATTRIBUTE_USERID, AttributeValue.builder().s(facility.getUserId()).build());
        result.put(ATTRIBUTE_TIMESTAMP, AttributeValue.builder().s(facility.getTimestamp()).build());
        result.put(ATTRIBUTE_RATING, AttributeValue.builder().s(facility.getRating()).build());
        result.put(ATTRIBUTE_ADDITIONALCOMMENT, AttributeValue.builder().s(facility.getAdditionalComment()).build());
        result.put(ATTRIBUTE_COMMENTS, AttributeValue.builder().ns(facility.getComments()).build());
        result.put(ATTRIBUTE_HASTOILET, AttributeValue.builder().s(facility.getHasToilet()).build());
        result.put(ATTRIBUTE_HASDISABLED, AttributeValue.builder().s(facility.getHasToilet()).build());
        result.put(ATTRIBUTE_BABYCARE, AttributeValue.builder().s(facility.getHasToilet()).build());
        result.put(ATTRIBUTE_HASMOSQUE, AttributeValue.builder().s(facility.getHasToilet()).build());
        return result;
    }

}