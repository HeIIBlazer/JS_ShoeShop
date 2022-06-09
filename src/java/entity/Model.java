package entity;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author makso
 */
@Entity
@XmlRootElement
public class Model implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String modelName;
    private String modelSize;
    private int amount;
    private double price;
    private String modelFirm;
    @OneToOne(cascade = CascadeType.DETACH)
    private Picture picture;

    @Override
    public String toString() {
        return "Model{" + "id=" + id + ", modelName=" + modelName + ", modelSize=" + modelSize + ", amount=" + amount + ", price=" + price + ", modelFirm=" + modelFirm + ", picture=" + picture + '}';
    }


    @Override
    public int hashCode() {
        int hash = 7;
        hash = 41 * hash + Objects.hashCode(this.id);
        hash = 41 * hash + Objects.hashCode(this.modelName);
        hash = 41 * hash + Objects.hashCode(this.modelSize);
        hash = 41 * hash + this.amount;
        hash = 41 * hash + (int) (Double.doubleToLongBits(this.price) ^ (Double.doubleToLongBits(this.price) >>> 32));
        hash = 41 * hash + Objects.hashCode(this.modelFirm);
        hash = 41 * hash + Objects.hashCode(this.picture);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Model other = (Model) obj;
        if (this.amount != other.amount) {
            return false;
        }
        if (Double.doubleToLongBits(this.price) != Double.doubleToLongBits(other.price)) {
            return false;
        }
        if (!Objects.equals(this.modelName, other.modelName)) {
            return false;
        }
        if (!Objects.equals(this.modelSize, other.modelSize)) {
            return false;
        }
        if (!Objects.equals(this.modelFirm, other.modelFirm)) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        if (!Objects.equals(this.picture, other.picture)) {
            return false;
        }
        return true;
    }

    public Picture getPicture() {
        return picture;
    }

    public void setPicture(Picture picture) {
        this.picture = picture;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getModelName() {
        return modelName;
    }

    public void setModelName(String modelName) {
        this.modelName = modelName;
    }

    public String getModelSize() {
        return modelSize;
    }

    public void setModelSize(String modelSize) {
        this.modelSize = modelSize;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getModelFirm() {
        return modelFirm;
    }

    public void setModelFirm(String modelFirm) {
        this.modelFirm = modelFirm;
    }

}